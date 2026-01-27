"use client";

import { useMemo, useEffect, useRef, useState } from "react";

const WPM_DIVISOR = 5;

function formatSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function TypingTrainer({ content, mode, lessonId }) {
  const targetText = useMemo(() => {
    if (mode === "words" && Array.isArray(content)) {
      return content.join(" ");
    }
    return typeof content === "string" ? content : "";
  }, [content, mode]);

  const [inputValue, setInputValue] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [records, setRecords] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!startTime || isFinished) {
      return undefined;
    }
    const interval = setInterval(() => {
      const now = Date.now();
      setElapsedSeconds((now - startTime) / 1000);
    }, 250);
    return () => clearInterval(interval);
  }, [startTime, isFinished]);

  useEffect(() => {
    setInputValue("");
    setStartTime(null);
    setElapsedSeconds(0);
    setIsFinished(false);
    setRecords([]);
    setIsSaving(false);
  }, [lessonId, targetText]);

  useEffect(() => {
    let isActive = true;
    fetch(`/api/records?lessonId=${lessonId}`)
      .then((response) => response.json())
      .then((data) => {
        if (isActive && Array.isArray(data.records)) {
          const lessonRecords = data.records.filter((record) => record.lessonId === lessonId);
          setRecords(lessonRecords.slice(-5).reverse());
        }
      })
      .catch(() => {
        if (isActive) {
          setRecords([]);
        }
      });
    return () => {
      isActive = false;
    };
  }, [lessonId]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }
    const nextValue = value.slice(0, targetText.length);
    setInputValue(nextValue);
    if (nextValue.length >= targetText.length) {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setInputValue("");
    setStartTime(null);
    setElapsedSeconds(0);
    setIsFinished(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const metrics = useMemo(() => {
    const typedChars = inputValue.length;
    let correctChars = 0;
    for (let i = 0; i < typedChars; i += 1) {
      if (inputValue[i] === targetText[i]) {
        correctChars += 1;
      }
    }
    const accuracy = typedChars > 0 ? (correctChars / typedChars) * 100 : 100;
    const minutes = Math.max(elapsedSeconds / 60, 1 / 60);
    const wpm = (correctChars / WPM_DIVISOR) / minutes;
    const progress = targetText.length > 0 ? (typedChars / targetText.length) * 100 : 0;

    return {
      typedChars,
      correctChars,
      accuracy: Number.isFinite(accuracy) ? accuracy : 100,
      wpm: Number.isFinite(wpm) ? wpm : 0,
      progress
    };
  }, [inputValue, targetText, elapsedSeconds]);

  useEffect(() => {
    if (!isFinished || isSaving || !targetText) {
      return;
    }
    setIsSaving(true);
    fetch("/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lessonId,
        wpm: Number(metrics.wpm.toFixed(1)),
        accuracy: Number(metrics.accuracy.toFixed(1)),
        durationSeconds: Math.round(elapsedSeconds)
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.record) {
          setRecords((prev) => [data.record, ...prev].slice(0, 5));
        }
      })
      .finally(() => setIsSaving(false));
  }, [isFinished, isSaving, metrics, lessonId, elapsedSeconds, targetText]);

  return (
    <div className="trainer">
      <div className="trainer__header">
        <div>
          <p className="eyebrow">Lesson</p>
          <h2 className="trainer__title">Practice Session</h2>
        </div>
        <button className="button button--ghost" type="button" onClick={handleReset}>
          Restart
        </button>
      </div>

      <div className="trainer__stats">
        <div className="stat">
          <span className="stat__label">WPM</span>
          <span className="stat__value">{metrics.wpm.toFixed(0)}</span>
        </div>
        <div className="stat">
          <span className="stat__label">Accuracy</span>
          <span className="stat__value">{metrics.accuracy.toFixed(1)}%</span>
        </div>
        <div className="stat">
          <span className="stat__label">Time</span>
          <span className="stat__value">{formatSeconds(elapsedSeconds)}</span>
        </div>
        <div className="stat">
          <span className="stat__label">Progress</span>
          <span className="stat__value">{metrics.progress.toFixed(0)}%</span>
        </div>
      </div>

      <div className="trainer__progress">
        <div className="trainer__progress-bar" style={{ width: `${metrics.progress}%` }} />
      </div>

      <div className="trainer__panel" onClick={() => inputRef.current?.focus()}>
        <p className="trainer__text" aria-label="Typing target">
          {targetText.split("").map((char, index) => {
            let className = "char";
            if (index < inputValue.length) {
              className += inputValue[index] === char ? " char--correct" : " char--incorrect";
            } else if (index === inputValue.length) {
              className += " char--current";
            }
            return (
              <span className={className} key={`${char}-${index}`}>
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </p>
      </div>

      <div className="trainer__input">
        <label htmlFor="typing-input">Start typing here</label>
        <textarea
          id="typing-input"
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onPaste={(event) => event.preventDefault()}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          placeholder="Start typing to begin the timer..."
          rows={4}
        />
      </div>

      {isFinished && (
        <div className="trainer__finish">
          <p>Nice work! Reset to try again or move to the next lesson.</p>
        </div>
      )}

      <div className="trainer__history">
        <div className="trainer__history-header">
          <h3>Recent attempts</h3>
          {isSaving && <span className="trainer__history-saving">Saving...</span>}
        </div>
        {records.length === 0 ? (
          <p className="trainer__history-empty">Complete a run to store your first record.</p>
        ) : (
          <ul className="trainer__history-list">
            {records.map((record) => (
              <li key={record.id}>
                <span>{new Date(record.createdAt).toLocaleString()}</span>
                <span>{record.wpm} WPM</span>
                <span>{record.accuracy}% accuracy</span>
                <span>{formatSeconds(record.durationSeconds)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

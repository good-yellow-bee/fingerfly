import Link from "next/link";
import { lessons } from "../data/lessons";

const heroHighlights = [
  "Measure accuracy and rhythm in real time",
  "Build flow with short lessons",
  "Warm up with focused drills"
];

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">English Typing Trainer</p>
          <h1>Train your hands. Shape your speed.</h1>
          <p className="hero__lead">
            Fingerfly is a focused typing trainer inspired by classic keyboard courses.
            Practice with clean lessons, instant feedback, and a calm, intentional pace.
          </p>
          <div className="hero__actions">
            <Link className="button" href="/lesson/1-basics">
              Start Basics
            </Link>
            <Link className="button button--ghost" href="/lesson/12-words">
              Jump to Words
            </Link>
          </div>
          <ul className="hero__list">
            {heroHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="hero__panel">
          <div className="hero__card">
            <h3>Daily focus</h3>
            <p>
              Ten minutes of concentrated practice will do more than an hour of distracted typing.
            </p>
          </div>
          <div className="hero__card hero__card--accent">
            <h3>Accuracy first</h3>
            <p>Build clean muscle memory, then push for speed.</p>
          </div>
        </div>
      </section>

      <section className="lessons">
        <div className="section-header">
          <h2>Lessons</h2>
          <p>Three curated tracks to guide your practice.</p>
        </div>
        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <Link className="lesson-card" key={lesson.id} href={`/lesson/${lesson.id}`}>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
              <span className="lesson-card__cta">Open lesson</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

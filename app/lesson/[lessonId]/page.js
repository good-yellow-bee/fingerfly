import Link from "next/link";
import { notFound } from "next/navigation";
import TypingTrainer from "../../../components/TypingTrainer";
import { getLessonById, lessons } from "../../../data/lessons";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export function generateMetadata({ params }) {
  const lesson = getLessonById(params.lessonId);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — Fingerfly Typing`,
    description: lesson.description
  };
}

export default function LessonPage({ params }) {
  const lesson = getLessonById(params.lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <section className="lesson">
      <div className="lesson__header">
        <div>
          <p className="eyebrow">Typing Lesson</p>
          <h1>{lesson.title}</h1>
          <p className="lesson__description">{lesson.description}</p>
        </div>
        <div className="lesson__actions">
          <Link className="button button--ghost" href="/">
            All lessons
          </Link>
          <Link className="button" href={`/lesson/${getNextLessonId(lesson.id)}`}>
            Next lesson
          </Link>
        </div>
      </div>

      <TypingTrainer content={lesson.content} mode={lesson.mode} lessonId={lesson.id} />
    </section>
  );
}

function getNextLessonId(currentId) {
  const index = lessons.findIndex((lesson) => lesson.id === currentId);
  if (index === -1) {
    return lessons[0].id;
  }
  const nextIndex = (index + 1) % lessons.length;
  return lessons[nextIndex].id;
}

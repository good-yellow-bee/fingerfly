# Fingerfly Typing Trainer

An English typing practice site inspired by classic keyboard training courses.

## Features
- Lessons: Basics, Letters, Words, Texts
- Live WPM, accuracy, time, and progress tracking
- Local record storage (single user, no accounts)
- Clean, responsive UI

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3004`.

## Lesson routes
- `/lesson/1-basics` (Basics)
- `/lesson/2-letters` (Letters)
- `/lesson/12-words` (Words)
- `/lesson/11-texts` (Texts)

## Local records
Records are saved to `data/records.json` via a simple API at `/api/records`.

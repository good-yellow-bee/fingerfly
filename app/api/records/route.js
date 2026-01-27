import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "records.json");

async function readRecords() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeRecords(records) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(records, null, 2));
}

export async function GET(request) {
  const records = await readRecords();
  const { searchParams } = new URL(request.url);
  const lessonId = searchParams.get("lessonId");
  const filtered = lessonId ? records.filter((record) => record.lessonId === lessonId) : records;
  return Response.json({ records: filtered });
}

export async function POST(request) {
  const payload = await request.json();
  const { lessonId, wpm, accuracy, durationSeconds } = payload || {};

  if (!lessonId || typeof wpm !== "number" || typeof accuracy !== "number") {
    return new Response("Invalid payload", { status: 400 });
  }

  const records = await readRecords();
  const record = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    lessonId,
    wpm,
    accuracy,
    durationSeconds: typeof durationSeconds === "number" ? durationSeconds : 0,
    createdAt: new Date().toISOString()
  };

  records.push(record);
  await writeRecords(records);

  return Response.json({ record });
}

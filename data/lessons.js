export const lessons = [
  {
    id: "1-podstawy",
    title: "Basics",
    type: "basics",
    description: "Home row drills, gentle rhythm, and finger awareness.",
    mode: "text",
    content:
      "asdf jkl; asdf jkl;  a s d f  j k l ;  fjfj dkdk slsl a;a;  asdfjkl;  fjdk sl; a;sl dkfj  steady hands, light touch."
  },
  {
    id: "2-litery",
    title: "Letters",
    type: "letters",
    description: "Top-row letter drills with gradual expansion.",
    mode: "text",
    content:
      "qaz qaz qaz  q a z  qa za  qaza\n" +
      "wsx wsx wsx  w s x  ws sx  wsxw\n" +
      "edc edc edc  e d c  ed dc  edce\n" +
      "rfv rfv rfv  r f v  rf fv  rfvf\n" +
      "tgb tgb tgb  t g b  tg gb  tgbt\n" +
      "yhn yhn yhn  y h n  yh hn  yhnn\n" +
      "ujm ujm ujm  u j m  uj jm  ujmm\n" +
      "ik, ik, ik,  i k ,  ik k,  ik,i\n" +
      "ol. ol. ol.  o l .  ol l.  ol.o\n" +
      "p;/ p;/ p;/  p ; /  p; ;/  p;/p\n" +
      "qaz wsx edc  rfv tgb yhn  ujm ik,  ol. p;/\n" +
      "qaz wsx edc rfv  qaz wsx edc rfv tgb  qaz wsx edc rfv tgb yhn\n" +
      "qaz wsx edc rfv tgb yhn ujm ik, ol. p;/"
  },
  {
    id: "11-teksty",
    title: "Texts",
    type: "texts",
    description: "Short paragraphs to build flow and endurance.",
    mode: "text",
    content:
      "The quiet keyboard is a small workshop. Each key is a lever, each press a promise. Keep your eyes on the screen, breathe steadily, and let the words arrive. Speed comes later; clarity comes first."
  },
  {
    id: "12-slowa",
    title: "Words",
    type: "words",
    description: "Common English words for clean, consistent accuracy.",
    mode: "words",
    content: [
      "time",
      "people",
      "way",
      "make",
      "work",
      "look",
      "find",
      "world",
      "life",
      "hand",
      "write",
      "sound",
      "point",
      "change",
      "place",
      "great",
      "again",
      "small",
      "every",
      "house",
      "right",
      "think",
      "number",
      "about",
      "water",
      "story",
      "light",
      "heart",
      "voice",
      "night"
    ]
  }
];

export function getLessonById(id) {
  return lessons.find((lesson) => lesson.id === id) || null;
}

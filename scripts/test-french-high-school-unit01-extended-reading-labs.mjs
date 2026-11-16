import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const html=readFileSync("Halls/french-high-school-unit01-instruction.html","utf8");
const start=html.indexOf("const extendedReadingPacks="),end=html.indexOf(";\nconst evidenceBridges=",start);
assert.ok(start>=0&&end>start,"Reading labs must be embedded for zero-fetch/offline use");
const embedded=JSON.parse(html.slice(start+"const extendedReadingPacks=".length,end));
const expected={"hs3":"education","hs4":"migration"};
for(const [course,theme] of Object.entries(expected)){
 test(course+" extended reading lab has six complete, original fictional source packets",()=>{
  const bank=JSON.parse(readFileSync("data/french-"+course+"-unit01-extended-reading-lab.json","utf8"));
  assert.deepEqual(embedded[course],bank);
  assert.equal(bank.course,course);
  assert.equal(bank.status,"formative-pilot-no-official-grade");
  assert.equal(bank.fictionalSources,true);
  assert.equal(bank.lessons.length,6);
  const ids=new Set(),prompts=new Set();
  for(const [i,lesson] of bank.lessons.entries()){
   assert.equal(lesson.lesson,i+1);
   assert.equal(lesson.id,course+"-u01-l0"+(i+1)+"-source01");
   assert.ok(lesson.title.length>=14);
   assert.match(lesson.source,/fictif|fictive|imaginaire/i);
   const words=lesson.passage.trim().split(/\s+/);
   assert.ok(words.length>=(course==="hs4"?145:130),"Insufficient connected French text for lesson "+(i+1));
   assert.match(lesson.passage,/\b(?:les|des|dans|une|nous|est|sont|leurs|leur|plusieurs)\b/i);
   assert.equal(lesson.questions.length,3);
   for(const [qi,q] of lesson.questions.entries()){
    assert.equal(q.id,course+"-u01-l0"+(i+1)+"-read-q0"+(qi+1));
    assert.equal(q.answer,[0,2,1][qi]);
    assert.equal(q.choices.length,3);
    assert.ok(q.prompt.length>=45);
    assert.ok(q.explanation.length>=65);
    assert.ok(q.choices.every(choice=>choice.length>=45),"Choice lacks plausible detail: "+q.id);
    assert.equal(new Set(q.choices.map(choice=>choice.normalize("NFC").trim().toLowerCase())).size,3);
    assert.ok(!ids.has(q.id));ids.add(q.id);
    assert.ok(!prompts.has(q.prompt));prompts.add(q.prompt);
   }
  }
  assert.equal(ids.size,18);
 });
}
test("shared Lesson 01 layout displays source and three answer-check controls per lab",()=>{
 assert.ok(html.includes('function renderExtendedReading(index)'));
 assert.ok(html.includes("steps+renderExtendedReading(index)"));
 assert.ok(html.includes("data-reading-check"));
 assert.ok(html.includes("Check my reading"));
 assert.ok(html.includes('type="radio"'));
 assert.ok(html.includes('role="status" aria-live="polite"'));
 assert.ok(html.includes("q.explanation"));
 assert.ok(html.includes("event.target.closest"));
 assert.ok(html.includes("You can change an answer and check again"));
 assert.ok(html.includes("p.lessons.map(renderLesson).join"));
});
test("lab is formative, never records learner progress or grants mastery",()=>{
 assert.doesNotMatch(html,/\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b|\bfetch\(/);
 assert.doesNotMatch(html,/\bgradeAttempt\(|\bsubmitAssessment\(|\bsetOfficialGrade\(/);
 assert.equal(embedded.hs3.status,"formative-pilot-no-official-grade");
 assert.equal(embedded.hs4.status,"formative-pilot-no-official-grade");
});

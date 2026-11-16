import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const review=JSON.parse(readFileSync("data/french-high-school-unit01-hs3-hs4-item-topic-crosswalk.json","utf8"));
const expected=[
 [1,["scolaire","élèves","school","education","tutorat","council","biblioth","éducat","parents"]],
 [2,["school","école","scolaire","élèves","school","scolaire","éducat","school","élèves"]],
 [3,["tutorat","atelier","élèves","school","school","school","school","school","intervenants"]],
 [4,["tutorat","scolaires","lycées","éducation","school","apprentissage","élèves","scolaire","scolaires"]],
 [5,["school","school","school","school","school","school","school","school","school"]],
 [6,["school","school","student","school","library","education","student","education","school"]]
];
for(const [lesson,terms] of expected){
 test("French III Lesson "+lesson+" retains nine education-specific language-use stems",()=>{
  const path="data/french-hs3-unit01-lesson0"+lesson+"-bank.json";
  const bank=JSON.parse(readFileSync(path,"utf8"));
  const rows=review.courses.hs3.lessons[lesson-1].questions;
  assert.equal(bank.status,"authoring-review-not-published");
  assert.equal(bank.questions.length,27);
  assert.equal(terms.length,9);
  for(let j=0;j<9;j++){
   const item=bank.questions[j],row=rows[j];
   assert.equal(item.domain,"language-use");
   assert.equal(row.id,item.id);
   assert.equal(row.prompt,item.prompt);
   assert.equal(row.correctAnswer,item.choices[item.answer]);
   assert.equal(row.category,"primary");
   assert.equal(row.review,"independent-review-pending");
   assert.match(item.prompt.toLowerCase(),new RegExp(terms[j]),item.id+" lacks education framing");
   assert.ok(item.answer>=0&&item.answer<3);
   assert.equal(new Set(item.choices.map(c=>c.toLowerCase())).size,3);
   assert.ok(item.explanation.length>=20);
  }
  for(let j=9;j<27;j++)assert.notEqual(bank.questions[j].domain,"language-use");
 });
}
test("Correct-option positions and all draft assessment boundaries remain protected",()=>{
 let count=0;
 for(let lesson=1;lesson<=6;lesson++){
  const bank=JSON.parse(readFileSync("data/french-hs3-unit01-lesson0"+lesson+"-bank.json","utf8"));
  assert.deepEqual([0,1,2].map(n=>bank.questions.filter(q=>q.answer===n).length),[9,9,9]);
  assert.deepEqual(["language-use","interpretation","transfer"].map(d=>bank.questions.filter(q=>q.domain===d).length),[9,9,9]);
  count+=bank.questions.length;
 }
 assert.equal(count,162);
 assert.equal(review.officialUnit01Eligible,false);
 assert.equal(review.reviewAuthority,"none");
 assert.equal(review.courses.hs3.lessons.flatMap(l=>l.questions).filter(q=>q.category==="primary").length,69);
});

import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {FRENCH_UNIT01_LESSON_QUOTAS,FRENCH_UNIT01_DOMAINS} from "../assets/french-high-school-unit01-balanced-exam.mjs";
const topic=JSON.parse(readFileSync("data/french-high-school-unit01-hs3-hs4-item-topic-crosswalk.json","utf8"));
const school=/(scolaire|école|élève|lycée|tutorat|bibliothèque|éducation|school|student|pupil|teacher|parent|reading|library|classroom|classe|éducat)/i;
const requiredNumbers=[10,11,12,13,14,19,20,21,22,23];
test("French III 60 reviewed reading/transfer items keep their school context",()=>{
 let total=0;
 for(let lesson=1;lesson<=6;lesson++){
  const path="data/french-hs3-unit01-lesson0"+lesson+"-bank.json";
  const data=JSON.parse(readFileSync(path,"utf8"));
  const reviews=topic.courses.hs3.lessons[lesson-1].questions;
  assert.equal(data.status,"authoring-review-not-published");
  for(const number of requiredNumbers){
   const q=data.questions[number-1],review=reviews[number-1];
   assert.match(q.prompt,school,q.id+" missing school context");
   assert.equal(review.id,q.id);
   assert.equal(review.prompt,q.prompt);
   assert.equal(review.correctAnswer,q.choices[q.answer]);
   assert.equal(review.category,"primary");
   assert.equal(review.review,"independent-review-pending");
   assert.equal(q.domain,number<=14?"interpretation":"transfer");
   assert.ok(q.explanation.length>=20);
   assert.equal(new Set(q.choices.map(c=>c.normalize("NFC").trim().toLowerCase())).size,3);
   total++;
  }
  assert.deepEqual([0,1,2].map(n=>data.questions.filter(q=>q.answer===n).length),[9,9,9]);
 }
 assert.equal(total,60);
});
test("French III provisional primary screening reaches all six required lesson and domain cells",()=>{
 const classes=topic.courses.hs3.lessons;
 let primaryTotal=0;
 for(let lesson=0;lesson<6;lesson++){
  for(let domain=0;domain<3;domain++){
   const eligible=classes[lesson].questions.filter(q=>q.category==="primary"&&q.domain===FRENCH_UNIT01_DOMAINS[domain]).length;
   assert.ok(eligible>=FRENCH_UNIT01_LESSON_QUOTAS[lesson][domain]+1,
    "Missing draft retake reserve for lesson "+(lesson+1)+" domain "+FRENCH_UNIT01_DOMAINS[domain]);
  }
  primaryTotal+=classes[lesson].questions.filter(q=>q.category==="primary").length;
 }
 assert.equal(primaryTotal,120);
 assert.equal(topic.officialUnit01Eligible,false);
 assert.equal(topic.reviewAuthority,"none");
});

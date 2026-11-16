import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {FRENCH_UNIT01_LESSON_QUOTAS,FRENCH_UNIT01_DOMAINS} from "../assets/french-high-school-unit01-balanced-exam.mjs";

const review=JSON.parse(readFileSync("data/french-high-school-unit01-hs3-hs4-item-topic-crosswalk.json","utf8"));
const migration=/(migrat|déplac|départ|exil|identit|diaspora|réfugi|reloc|accueil|francophon|famille|témoign|archive|traduction|reconstitution|documentaire|mémoire|communaut|migrant|family|displace)/i;
test("French IV all 54 language-use items explicitly connect to migration/identity learning",()=>{
 let total=0;
 for(let lesson=1;lesson<=6;lesson++){
  const file="data/french-hs4-unit01-lesson0"+lesson+"-bank.json";
  const bank=JSON.parse(readFileSync(file,"utf8"));
  const rows=review.courses.hs4.lessons[lesson-1].questions;
  assert.equal(bank.status,"authoring-review-not-published");
  assert.equal(bank.questions.length,27);
  for(let i=0;i<9;i++){
   const q=bank.questions[i],r=rows[i];
   assert.match(q.prompt,migration,q.id+" lacks identity/migration context");
   assert.equal(q.domain,"language-use");
   assert.equal(q.id,r.id);
   assert.equal(q.prompt,r.prompt);
   assert.equal(q.choices[q.answer],r.correctAnswer);
   assert.equal(r.category,"primary");
   assert.equal(r.review,"independent-review-pending");
   assert.equal(q.answer,i%3===0?0:i%3===1?2:1);
   assert.equal(new Set(q.choices.map(s=>s.toLowerCase().trim())).size,3);
   assert.ok(q.explanation.trim().length>=20);
   total++;
  }
  assert.deepEqual([0,1,2].map(i=>bank.questions.filter(q=>q.answer===i).length),[9,9,9]);
 }
 assert.equal(total,54);
});
test("Three migration interpretation/source additions meet preliminary per-cell reserves",()=>{
 for(const [lesson,number] of [[1,19],[2,20],[3,10]]){
  const bank=JSON.parse(readFileSync("data/french-hs4-unit01-lesson0"+lesson+"-bank.json","utf8"));
  const q=bank.questions[number-1],r=review.courses.hs4.lessons[lesson-1].questions[number-1];
  assert.match(q.prompt,migration);
  assert.equal(r.prompt,q.prompt);
  assert.equal(r.correctAnswer,q.choices[q.answer]);
  assert.equal(r.category,"primary");
 }
});
test("French IV preliminary theme quotas and spare candidate remain unapproved",()=>{
 let count=0;
 for(let lesson=0;lesson<6;lesson++){
  const rows=review.courses.hs4.lessons[lesson].questions;
  for(let domain=0;domain<3;domain++){
   const n=rows.filter(q=>q.category==="primary"&&q.domain===FRENCH_UNIT01_DOMAINS[domain]).length;
   assert.ok(n>=FRENCH_UNIT01_LESSON_QUOTAS[lesson][domain]+1,
    "Missing draft reserve for French IV lesson "+(lesson+1)+" / "+FRENCH_UNIT01_DOMAINS[domain]);
  }
  count+=rows.filter(q=>q.category==="primary").length;
 }
 assert.equal(count,114);
 assert.equal(review.officialUnit01Eligible,false);
 assert.equal(review.reviewAuthority,"none");
});

import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {examBlueprint,validateAssessmentBank,drawAssessment,gradeAttempt} from "../assets/french-high-school-assessment-contract.mjs";

const courses=["hs1","hs2","hs3","hs4"];
const domains=["language-use","interpretation","transfer"];
for(const course of courses){
 test(course+" · 27 original Unit 01 Lesson 01 questions meet structural contract",()=>{
  const data=JSON.parse(readFileSync("data/french-"+course+"-unit01-lesson01-bank.json","utf8"));
  assert.equal(data.course,course);
  assert.equal(data.unit,1);assert.equal(data.lesson,1);
  assert.equal(data.status,"authoring-review-not-published");
  assert.equal(data.editorialReview,"pending-independent-linguistic-review");
  const bp=examBlueprint(course,"lesson",{lesson:1});
  const bank=data.questions;
  assert.equal(bank.length,27);
  const checked=validateAssessmentBank(bp,bank);
  assert.deepEqual(checked.errors,[]);
  assert.equal(checked.ready,true);
  assert.deepEqual([...new Set(bank.map(q=>q.domain))].sort(),domains);
  for(const domain of domains)assert.equal(bank.filter(q=>q.domain===domain).length,9);
  assert.equal(new Set(bank.map(q=>q.prompt.normalize("NFC").toLowerCase().trim())).size,27);
  assert.deepEqual([0,1,2].map(i=>bank.filter(q=>q.answer===i).length),[9,9,9]);
  const selected=drawAssessment(bp,bank,{random:()=>0.4});
  assert.equal(selected.length,20);
  assert.equal(new Set(selected.map(q=>q.id)).size,20);
  assert.equal(gradeAttempt(bp,selected,selected.map(q=>q.answer)).passed,true);
  assert.equal(gradeAttempt(bp,selected,selected.map(q=>(q.answer+1)%q.choices.length)).passed,false);
  const next=drawAssessment(bp,bank,{previousIds:selected.map(q=>q.id),random:()=>0.4});
  assert.equal(next.filter(q=>!selected.some(p=>p.id===q.id)).length,7);
 });
}
test("All four lessons are distinct, no placeholder-like repeated question prompts",()=>{
 const sets=courses.map(course=>JSON.parse(readFileSync("data/french-"+course+"-unit01-lesson01-bank.json","utf8")).questions);
 const prompts=sets.flat().map(q=>q.prompt.normalize("NFC").toLowerCase().trim());
 assert.equal(prompts.length,108);
 assert.equal(new Set(prompts).size,108);
});

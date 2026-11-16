import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {examBlueprint,validateAssessmentBank} from "../assets/french-high-school-assessment-contract.mjs";
import {FRENCH_UNIT01_LESSON_QUOTAS,FRENCH_UNIT01_DOMAINS} from "../assets/french-high-school-unit01-balanced-exam.mjs";

const cross=JSON.parse(readFileSync("data/french-high-school-unit01-hs3-hs4-item-topic-crosswalk.json","utf8"));
const fixes={
 hs3:[[5,6,null],[6,15,null]],
 hs4:[[1,7,"consultent"],[2,8,"Le document aurait été rédigé vers 1920."],
 [3,10,"More displaced families could hypothetically have spoken."],
 [4,5,"Ce document présente plusieurs éléments."],
 [4,6,"Traduction proposée par l'éditeur; nuance expliquée en note."],
 [5,3,"Une scène reconstituée par des acteurs, distincte des images d'archive."],
 [5,4,"Named fictional author, fictional date, teaching-source identifier and relevant context."],
 [5,6,"L'attribution de ce manuscrit à cette autrice reste débattue."]]
};
for(const course of ["hs3","hs4"]){
 test(course+" all 162 draft questions retain valid banks, unchanged identity and source crosswalk parity",()=>{
  const ids=new Set(),prompts=new Set(),editorial=[];
  for(let lesson=1;lesson<=6;lesson++){
   const bank=JSON.parse(readFileSync("data/french-"+course+"-unit01-lesson0"+lesson+"-bank.json","utf8"));
   const items=cross.courses[course].lessons[lesson-1].questions;
   const bp=examBlueprint(course,"lesson",{lesson});
   assert.equal(bank.status,"authoring-review-not-published");
   assert.match(bank.editorialReview,/independent-review-pending/);
   assert.deepEqual(validateAssessmentBank(bp,bank.questions).errors,[]);
   assert.equal(bank.questions.length,27);
   for(const domain of FRENCH_UNIT01_DOMAINS)assert.equal(bank.questions.filter(q=>q.domain===domain).length,9);
   for(const answer of [0,1,2])assert.equal(bank.questions.filter(q=>q.answer===answer).length,9);
   for(const [i,q] of bank.questions.entries()){
    const row=items[i],p=q.prompt.normalize("NFC").trim().toLowerCase();
    assert.ok(!ids.has(q.id));ids.add(q.id);
    assert.ok(!prompts.has(p));prompts.add(p);
    assert.equal(row.id,q.id);assert.equal(row.prompt,q.prompt);
    assert.equal(row.correctAnswer,q.choices[q.answer]);assert.equal(row.domain,q.domain);
    assert.equal(row.review,"independent-review-pending");
    if(row.editorialCorrection)editorial.push(row.id);
   }
  }
  assert.equal(ids.size,162);assert.equal(prompts.size,162);
  const known=fixes[course].map(([l,n])=>course+"-u01-l"+String(l).padStart(2,"0")+"-q"+String(n).padStart(3,"0"));
  assert.deepEqual(editorial.sort(),known.sort());
  assert.equal(cross.officialUnit01Eligible,false);
 });
 test(course+" corrected items maintain intended keys and editorial reasoning",()=>{
  for(const [lesson,num,expected] of fixes[course]){
   const b=JSON.parse(readFileSync("data/french-"+course+"-unit01-lesson0"+lesson+"-bank.json","utf8"));
   const q=b.questions[num-1],row=cross.courses[course].lessons[lesson-1].questions[num-1];
   if(expected!==null)assert.ok(q.choices.includes(expected)||q.choices[q.answer]===expected,
     "Corrected key not present for "+q.id);
   assert.equal(row.correctAnswer,q.choices[q.answer]);
   assert.ok(q.explanation.length>=35);
  }
 });
}
test("The theme quota prototype is NOT an approved-item release gate",()=>{
 assert.equal(cross.reviewAuthority,"none");
 assert.equal(cross.status,"assistant-screening-only-not-independent-review");
 for(const course of ["hs3","hs4"]){
  for(let i=0;i<6;i++)for(let j=0;j<3;j++){
   const rows=cross.courses[course].lessons[i].questions;
   const n=rows.filter(q=>q.category==="primary"&&q.domain===FRENCH_UNIT01_DOMAINS[j]).length;
   assert.ok(n>=FRENCH_UNIT01_LESSON_QUOTAS[i][j]+1);
  }
 }
});

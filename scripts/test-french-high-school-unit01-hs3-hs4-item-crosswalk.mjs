import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const crosswalk=JSON.parse(readFileSync("data/french-high-school-unit01-hs3-hs4-item-topic-crosswalk.json","utf8"));
const categories=["primary","transfer","later-unit","requires-rewrite"];
test("draft question review is explicitly NOT independent editorial approval",()=>{
 assert.equal(crosswalk.status,"assistant-screening-only-not-independent-review");
 assert.equal(crosswalk.officialUnit01Eligible,false);
 assert.equal(crosswalk.reviewAuthority,"none");
 assert.deepEqual(crosswalk.categories,categories);
});
let reviewed=0;
for(const course of ["hs3","hs4"]){
 test(course+" item-level classifications retain all 162 unchanged authored questions",()=>{
  const lessons=crosswalk.courses[course].lessons;
  assert.equal(lessons.length,6);
  const ids=new Set();
  for(let i=0;i<6;i++){
   const lesson=lessons[i],number=i+1;
   const path="data/french-"+course+"-unit01-lesson0"+number+"-bank.json";
   const bank=JSON.parse(readFileSync(path,"utf8"));
   assert.equal(bank.status,"authoring-review-not-published");
   assert.equal(lesson.lesson,number);
   assert.equal(lesson.questions.length,27);
   for(let j=0;j<27;j++){
    const row=lesson.questions[j],q=bank.questions[j];
    assert.equal(row.id,q.id);
    assert.equal(row.prompt,q.prompt);
    assert.equal(row.correctAnswer,q.choices[q.answer]);
    assert.equal(row.sourceBank,path);
    assert.equal(row.draftLesson,number);
    assert.equal(row.domain,q.domain);
    assert.ok(categories.includes(row.category));
    assert.equal(row.review,"independent-review-pending");
    assert.ok(row.taughtPilotObjective.length>10);
    assert.ok(row.rationale.length>40);
    assert.ok(!ids.has(row.id));
    ids.add(row.id);reviewed++;
   }
  }
  assert.equal(ids.size,162);
 });
}
test("all 324 French III-IV questions are accounted for exactly once",()=>{
 assert.equal(reviewed,324);
});
test("revised thematic screening still cannot promote draft items to official exam status",()=>{
 const count=(course,category)=>crosswalk.courses[course].lessons.flatMap(l=>l.questions).filter(q=>q.category===category).length;
 assert.equal(count("hs3","primary"),120);
 assert.equal(count("hs3","later-unit"),10);
 assert.equal(count("hs3","requires-rewrite"),0);
 assert.equal(count("hs4","primary"),114);
 assert.equal(count("hs4","later-unit"),12);
 assert.ok(count("hs3","primary")>=67);
 assert.ok(count("hs4","primary")>=67);
 assert.equal(crosswalk.officialUnit01Eligible,false);
});

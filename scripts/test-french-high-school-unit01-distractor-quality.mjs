import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const cross=JSON.parse(readFileSync("data/french-high-school-unit01-hs3-hs4-item-topic-crosswalk.json","utf8"));
const selection={"hs3":[[1,6],[1,9],[1,20],[2,19],[2,20],[3,8],[3,20]],"hs4":[[1,19],[4,3],[4,6],[5,3],[5,5],[6,4],[6,7]]};
for(const [course,refs] of Object.entries(selection)){
 test(course+" fourteen targeted distractor corrections retain keyed answers and source IDs",()=>{
  let seen=new Set();
  for(const [lesson,number] of refs){
   const bank=JSON.parse(readFileSync("data/french-"+course+"-unit01-lesson0"+lesson+"-bank.json","utf8"));
   const q=bank.questions[number-1],r=cross.courses[course].lessons[lesson-1].questions[number-1];
   assert.equal(q.id,r.id);assert.equal(q.prompt,r.prompt);
   assert.equal(q.choices[q.answer],r.correctAnswer);
   assert.equal(q.domain,r.domain);
   assert.equal(bank.status,"authoring-review-not-published");
   assert.equal(q.choices.length,3);
   assert.equal(new Set(q.choices.map(c=>c.normalize("NFC").trim().toLowerCase())).size,3);
   assert.ok(q.explanation.length>=85);
   assert.ok(q.choices.filter((_,i)=>i!==q.answer).every(x=>x.length>=50));
   assert.ok(!seen.has(q.id));seen.add(q.id);
  }
  assert.equal(seen.size,7);
 });
}
test("Four-grade assessment eligibility remains withheld",()=>{
 assert.equal(cross.officialUnit01Eligible,false);
 assert.equal(cross.reviewAuthority,"none");
});

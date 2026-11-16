import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const load=c=>JSON.parse(readFileSync("data/french-"+c+"-unit01-lesson01-bank.json","utf8"));
const item=(c,n)=>load(c).questions.find(q=>q.id===c+"-u01-l01-q"+String(n).padStart(3,"0"));
for(const course of ["hs1","hs2","hs3","hs4"]){
 test(course+" remains unpublished after editorial corrections",()=>{
  const b=load(course);
  assert.equal(b.status,"authoring-review-not-published");
  assert.equal(b.editorialReview,"assistant-editorial-pass-complete-independent-review-pending");
  assert.equal(b.questions.length,27);
  assert.equal(new Set(b.questions.map(q=>q.id)).size,27);
  assert.equal(new Set(b.questions.map(q=>q.prompt.normalize("NFC").toLowerCase())).size,27);
  assert.ok(b.questions.every(q=>q.choices.length===3&&q.answer>=0&&q.answer<3));
 });
}
test("French I does not assume a single gendered Enchanté form",()=>{
 const q=item("hs1",27);
 assert.match(q.prompt,/regardless of the speaker.s gender/i);
 assert.match(q.choices[q.answer],/enchanté\(e\)/i);
});
test("French II specifies speaker agreement before keying allés",()=>{
 const q=item("hs2",1);
 assert.match(q.prompt,/two boys/i);
 assert.equal(q.choices[q.answer],"sommes allés");
 assert.ok(q.choices.includes("sommes allées"));
});
test("French III causal connector forms a grammatical phrase",()=>{
 const q=item("hs3",7);
 assert.match(q.prompt,/son coût est raisonnable/i);
 assert.equal(q.choices[q.answer],"parce que");
 assert.doesNotMatch(q.prompt,/___ elle est/i);
});
test("French IV prompts for methodological rather than absolute claims",()=>{
 const q=item("hs4",16);
 assert.match(q.prompt,/erreur méthodologique/i);
 assert.match(q.choices[q.answer],/tous les témoins/i);
});

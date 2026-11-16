import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const html=readFileSync("Halls/french-high-school-unit01-instruction.html","utf8");
function parse(name,after){
 const a=html.indexOf("const "+name+"="),b=html.indexOf(";\nconst "+after+"=",a);
 assert.ok(a>=0&&b>a,"Missing embedded "+name);
 return JSON.parse(html.slice(a+("const "+name+"=").length,b));
}
const reading=parse("extendedReadingPacks","evidenceBridges");
const bridge=parse("evidenceBridges","listeningSpeakingPack");
const oral=parse("listeningSpeakingPack","grade");
const keys={hs1:[[0,1,2],[0,1,2],[1,0,2],[1,0,2],[2,0,1],[0,1,2]],hs2:[[2,0,1],[1,0,2],[1,0,2],[0,1,2],[2,0,1],[0,1,2]]};
for(const course of ["hs1","hs2"]){
 test(course+" complete six-lesson reading, listening and original French writing continuum",()=>{
  const read=JSON.parse(readFileSync("data/french-"+course+"-unit01-extended-reading-lab.json","utf8"));
  const spoken=JSON.parse(readFileSync("data/french-"+course+"-unit01-guided-listening-speaking.json","utf8"));
  const writing=JSON.parse(readFileSync("data/french-"+course+"-unit01-integrated-evidence-bridges.json","utf8"));
  assert.deepEqual(reading[course],read);
  assert.deepEqual(oral.courses[course].lessonActivities,spoken.lessonActivities);
  assert.deepEqual(bridge.courses[course].lessons,writing.lessons);
  assert.equal(read.lessons.length,6);
  assert.equal(spoken.lessonActivities.length,6);
  assert.equal(writing.lessons.length,6);
  assert.equal(read.status,"formative-pilot-no-official-grade");
  assert.equal(spoken.officialListeningCertified,false);
  assert.equal(writing.gradeAuthority,"none");
  const ids=new Set();
  for(let i=0;i<6;i++){
   const r=read.lessons[i],o=spoken.lessonActivities[i],w=writing.lessons[i];
   assert.equal(r.lesson,i+1);assert.equal(o.lesson,i+1);assert.equal(w.lesson,i+1);
   assert.match(r.source,/fictif|fictive|imaginaire/i);
   assert.ok(r.passage.split(/\s+/).length>=(course==="hs1"?95:105));
   assert.equal(r.questions.length,3);
   for(let j=0;j<3;j++){
    const q=r.questions[j];
    assert.equal(q.answer,keys[course][i][j],"Correct answer location "+q.id);
    assert.ok(q.choices[q.answer].length>=22);
    assert.ok(new Set(q.choices.map(v=>v.toLowerCase().trim())).size===3);
    assert.ok(q.explanation.length>=45);
    assert.ok(!ids.has(q.id));ids.add(q.id);
   }
   assert.ok(o.transcript.trim().split(/\s+/).length>=(course==="hs1"?60:70));
   assert.equal(o.comprehension.length,2);
   assert.ok(o.oralTask.length>=70);
   assert.equal(o.reviewCriteria.length,4);
   assert.equal(w.criteria.length,4);
   assert.equal(w.steps.length,6);
   assert.ok(w.create.length>=80);
   assert.ok(w.feedback.length>=75);
   assert.ok(w.bridge.length>=65);
  }
  assert.equal(ids.size,18);
 });
}
test("same single renderer supports four grades without automatic storage or scores",()=>{
 assert.deepEqual(Object.keys(reading),["hs1","hs2","hs3","hs4"]);
 assert.deepEqual(Object.keys(oral.courses),["hs1","hs2","hs3","hs4"]);
 assert.deepEqual(Object.keys(bridge.courses),["hs1","hs2","hs3","hs4"]);
 assert.ok(html.includes("p.lessons.map(renderLesson).join"));
 assert.ok(html.includes("renderExtendedReading(index)+renderGuidedListeningSpeaking(index)+renderIntegratedEvidenceBridge(index)"));
 assert.ok(html.includes("Export my practice notes (.txt)"));
 assert.doesNotMatch(html,/\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b|\bfetch\(/);
 assert.doesNotMatch(html,/\bsubmitAssessment\(|\bgradeAttempt\(|\bgetUserMedia\b/);
});

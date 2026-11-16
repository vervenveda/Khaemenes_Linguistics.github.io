import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const page=readFileSync("Halls/french-high-school-unit01-instruction.html","utf8");
const data=JSON.parse(readFileSync("data/french-hs3-hs4-unit01-guided-listening-speaking.json","utf8"));
const a=page.indexOf("const listeningSpeakingPack="),b=page.indexOf(";\nconst grade=",a);
assert.ok(a>=0&&b>a,"Teacher-led content embedded without network fetch");
const embedded=JSON.parse(page.slice(a+"const listeningSpeakingPack=".length,b));
test("teacher-led dialogue packets exactly match published static companion content",()=>{
 assert.deepEqual(embedded,data);
 assert.equal(data.status,"formative-teacher-partner-read-not-recorded");
 assert.equal(data.officialListeningCertified,false);
 assert.deepEqual(Object.keys(data.courses),["hs1","hs2","hs3","hs4"]);
});
for(const course of ["hs3","hs4"]){
 test(course+" six dialogues supply two comprehension questions and an oral task",()=>{
  const activities=data.courses[course].lessonActivities;
  assert.equal(activities.length,6);
  const ids=new Set();
  for(const [i,activity] of activities.entries()){
   assert.equal(activity.lesson,i+1);
   assert.equal(activity.id,course+"-u01-l0"+(i+1)+"-oral01");
   assert.ok(!ids.has(activity.id));ids.add(activity.id);
   assert.ok(activity.transcript.trim().split(/\s+/).length>=70);
   assert.match(activity.transcript,/«/);
   assert.equal(activity.comprehension.length,2);
   assert.ok(activity.comprehension.every(x=>x.length>=28));
   assert.ok(activity.oralTask.length>=75);
   assert.equal(activity.reviewCriteria.length,4);
   assert.ok(activity.reviewCriteria.every(x=>x.length>=30));
  }
 });
}
test("listening/speaking lab is supplemental, accessible and requires human feedback",()=>{
 assert.ok(page.includes("function renderGuidedListeningSpeaking(index)"));
 assert.ok(page.includes("renderExtendedReading(index)+renderGuidedListeningSpeaking(index)"));
 assert.ok(page.includes("Reveal the French transcript after listening"));
 assert.ok(page.includes("Teacher or partner review criteria"));
 assert.ok(page.includes("not count that as assessed listening"));
 assert.ok(page.includes("data-oral-play"));
 assert.ok(page.includes("data-oral-stop"));
 assert.ok(page.includes("SpeechSynthesisUtterance"));
 assert.ok(page.includes("v.localService===true"));
 assert.ok(page.includes("No local French voice is installed"));
 assert.ok(page.includes("stopGuidedSpeech()"));
 assert.ok(page.includes('lang="fr"'));
 assert.doesNotMatch(page,/\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b|\bfetch\(/);
 assert.doesNotMatch(page,/\bMediaRecorder\b|\bgetUserMedia\b|\bgradeAttempt\(/);
});

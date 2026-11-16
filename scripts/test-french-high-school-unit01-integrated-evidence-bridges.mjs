import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const html=readFileSync("Halls/french-high-school-unit01-instruction.html","utf8");
const a=html.indexOf("const evidenceBridges="),b=html.indexOf(";\nconst listeningSpeakingPack=",a);
assert.ok(a>=0&&b>a,"Embedded bridge metadata must remain offline-readable");
const embedded=JSON.parse(html.slice(a+"const evidenceBridges=".length,b));
const master=JSON.parse(readFileSync("data/french-hs3-hs4-unit01-integrated-evidence-bridges.json","utf8"));
const speech=JSON.parse(readFileSync("data/french-hs3-hs4-unit01-guided-listening-speaking.json","utf8"));
test("all 12 embedded bridges match canonical data exactly",()=>{
 assert.deepEqual(embedded,master);
 assert.equal(master.status,"pilot-teacher-review-no-official-grade");
 assert.equal(master.gradeAuthority,"none");
 assert.deepEqual(Object.keys(master.courses),["hs3","hs4"]);
});
for(const course of ["hs3","hs4"]){
 test(course+" six bridges connect evidence, source limits, oral interpretation and authentic original work",()=>{
  const bridges=master.courses[course].lessons;
  const reading=JSON.parse(readFileSync("data/french-"+course+"-unit01-extended-reading-lab.json","utf8"));
  const guided=speech.courses[course].lessonActivities;
  assert.equal(bridges.length,6);
  const seen=new Set();
  for(const [i,x] of bridges.entries()){
   assert.equal(x.lesson,i+1);
   assert.equal(x.id,course+"-u01-l0"+(i+1)+"-bridge01");
   assert.ok(!seen.has(x.id));seen.add(x.id);
   assert.equal(reading.lessons[i].lesson,x.lesson);
   assert.equal(guided[i].lesson,x.lesson);
   assert.equal(x.steps.length,6);
   assert.equal(x.criteria.length,4);
   for(const k of ["focus","retrieve","interpret","listen","create","feedback","bridge"]){
    assert.ok(x[k].length>=65,k+" underdeveloped in "+x.id);
   }
   assert.ok(x.criteria.every(c=>c.length>=38),"Rubric too short: "+x.id);
   assert.match(x.retrieve,/\b(?:Citez|Relevez|Indiquez|Distinguez|Identifiez|Détaillez)\b/i);
   assert.match(x.listen,/\b(?:dialogue|entretien|audio|échange|historienne|guide|forum)\b/i);
   assert.ok(/\b(?:Rédigez|Écrivez|Élaborez|Composez|Produisez|Concevez|Présentez)\b/i.test(x.create));
   assert.ok(x.bridge.length>=70);
  }
 });
}
test("Lesson 01 blueprint remains one renderer, with no stored or automatically assessed student work",()=>{
 assert.ok(html.includes("function renderIntegratedEvidenceBridge(index)"));
 assert.ok(html.includes("renderGuidedListeningSpeaking(index)+renderIntegratedEvidenceBridge(index)"));
 assert.ok(html.includes('class="bridge-lab"'));
 assert.ok(html.includes('type="checkbox"'));
 assert.ok(html.includes("<textarea"));
 assert.ok(html.includes("Evidence notes and source attribution"));
 assert.ok(html.includes("My original French response and revision"));
 assert.ok(html.includes("No responses, checklist selections or scores are transmitted or saved automatically"));
 assert.ok(html.includes("p.lessons.map(renderLesson).join"));
 assert.doesNotMatch(html,/\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b|\bfetch\(/);
 assert.doesNotMatch(html,/\bgradeAttempt\(|\bsubmitAssessment\(|\bgetUserMedia\b/);
});

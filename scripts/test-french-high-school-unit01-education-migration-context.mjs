import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const html=readFileSync("Halls/french-high-school-unit01-instruction.html","utf8");
const crosswalk=JSON.parse(readFileSync("data/french-high-school-unit01-pilot-theme-crosswalk.json","utf8"));
function unpack(name,following){
 const a=html.indexOf("const "+name+"="),b=html.indexOf(";\n"+following,a);
 assert.ok(a>=0&&b>a,"Missing embedded "+name);
 return JSON.parse(html.slice(a+("const "+name+"=").length,b));
}
const packs=unpack("packs","const themeCrosswalk");
const mirror=unpack("themeCrosswalk","function escapeHtml");
test("revised teaching context keeps crosswalk mirrored and approval withheld",()=>{
 assert.deepEqual(mirror,crosswalk);
 assert.equal(crosswalk.status,"draft-review-required-not-authoritative");
 assert.equal(crosswalk.assessmentQuestionAlignment,"pending-item-level-crosswalk-and-qualified-linguistic-review");
 assert.equal(crosswalk.pilotLessonsAreOfficialWeeks,false);
});
test("French III six lessons explicitly model education, not generic municipal policy",()=>{
 const lessons=packs.hs3.lessons;
 assert.equal(lessons.length,6);
 const required=[
  /collèges|bibliothèque|école|élèves/i,
  /scolaire|familles|activités/i,
  /lycée|tutorat|atelier/i,
  /lycée|chercheuse|élèves/i,
  /enquête|bibliothèque|école/i,
  /scolaires|lecture|familles/i
 ];
 for(let i=0;i<lessons.length;i++){
  const [title,objective,explanation,model,reading,practice,product,feedback]=lessons[i];
  assert.match(model,required[i],"French III model "+(i+1));
  assert.match(objective+" "+product,/éducation|school|éducat|source|argument|education|proposal|academic/i);
  assert.ok(explanation.length>=160&&reading.length>=85&&practice.length>=75&&feedback.length>=75);
  assert.ok(model.length>=100);
  assert.ok(crosswalk.courses.hs3.lessons[i].note.includes("individual drafted assessment items"));
 }
});
test("French IV six lessons distinguish migration testimony from factual claims",()=>{
 const lessons=packs.hs4.lessons;
 assert.equal(lessons.length,6);
 const required=[
  /départs|déplacée|identité/i,
  /famille|port|exil/i,
  /familles|itinéraire|sources/i,
  /quitter|village|témoignage/i,
  /frontali|famille|poème/i,
  /arrivée|migrations|lettre/i
 ];
 for(let i=0;i<lessons.length;i++){
  const [title,objective,explanation,model,reading,practice,product,feedback]=lessons[i];
  assert.match(model,required[i],"French IV model "+(i+1));
  assert.ok(explanation.length>=160&&reading.length>=85&&practice.length>=75&&feedback.length>=75);
  assert.match(explanation+" "+model+" "+product,/fictif|fictional|fictive|imagined/i);
  assert.ok(crosswalk.courses.hs4.lessons[i].note.includes("individual drafted assessment items"));
 }
});
test("shared Lesson 01 renderer and historical Hall course topology remain untouched",()=>{
 assert.ok(html.includes("LESSON01_BLUEPRINT"));
 assert.ok(html.includes("p.lessons.map(renderLesson).join"));
 assert.ok(!/localStorage|sessionStorage|indexedDB|fetch\(/.test(html));
 assert.deepEqual(Object.keys(packs),["hs1","hs2","hs3","hs4"]);
 assert.equal(packs.hs1.lessons.length,6);
 assert.equal(packs.hs2.lessons.length,6);
});

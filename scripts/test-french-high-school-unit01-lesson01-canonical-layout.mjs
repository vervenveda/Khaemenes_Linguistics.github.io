import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const html=readFileSync("Halls/french-high-school-unit01-instruction.html","utf8");
const a=html.indexOf("const packs="),b=html.indexOf(";\nconst themeCrosswalk",a);
assert.ok(a>=0&&b>a,"Lesson bank data must be present");
const packs=JSON.parse(html.slice(a+"const packs=".length,b));
const headings=[
 "Explore · Teaching explanation",
 "Read · Original French model",
 "Check · Guided interpretation",
 "Practice · Correct and explain",
 "Create · Your evidence",
 "Reflect · Self-check and feedback"
];

test("Lesson 01 is the one rendering blueprint for all 24 lessons",()=>{
 assert.match(html,/const LESSON01_BLUEPRINT=Object\.freeze\(\[/);
 assert.match(html,/function renderLesson\(lesson,index\)/);
 assert.ok(html.includes('p.lessons.map(renderLesson).join("")'));
 assert.equal((html.match(/function renderLesson\(/g)||[]).length,1);
 for(const h of headings)assert.equal(html.split('label:"'+h+'"').length-1,1);
 assert.equal(html.split('class="lesson-head"').length-1,1);
});
for(const [course,pack] of Object.entries(packs)){
 test(course+" preserves unique academic content in a shared six-lesson template",()=>{
  assert.equal(pack.lessons.length,6);
  for(const [i,l] of pack.lessons.entries()){
   assert.equal(l.length,8,"Lesson "+(i+1)+" must contain eight canonical fields");
   for(const [fieldIndex,value] of l.entries())assert.ok(value.trim().length>=(fieldIndex===0?10:35));
  }
  assert.equal(new Set(pack.lessons.map(l=>l[0])).size,6);
 });
}
test("Expandable view and no record mutations remain",()=>{
 assert.ok(html.includes('id="openAll"')&&html.includes('id="closeAll"'));
 assert.ok(html.includes('stepIndex===0?\' open\':\'\''));
 assert.ok(html.includes("window.print()"));
 assert.ok(html.includes('lang="fr"'));
 assert.doesNotMatch(html,/localStorage|sessionStorage|indexedDB|submitAssessment|gradeAttempt/);
});

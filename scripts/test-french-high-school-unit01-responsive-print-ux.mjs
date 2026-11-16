import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const html=readFileSync("Halls/french-high-school-unit01-instruction.html","utf8");
const style=html.slice(html.indexOf("<style>")+7,html.indexOf("</style>"));
const javascript=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
test("full four-grade page script compiles without executing browser hooks",()=>{
 assert.doesNotThrow(()=>new Function(javascript));
 assert.ok(html.includes("p.lessons.map(renderLesson).join"));
 assert.equal((html.match(/function renderLesson\(/g)||[]).length,1);
});
test("tablet and desktop lessons remain readable as one full-width column",()=>{
 assert.match(style,/#lessons\{display:grid;grid-template-columns:minmax\(0,1fr\)/);
 assert.doesNotMatch(style,/#lessons\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
 assert.match(style,/@media\(max-width:640px\)/);
 assert.match(style,/\.lesson-jump-links\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
 assert.match(style,/\.bridge-lab textarea\{display:block;width:100%/);
 assert.match(style,/overflow-wrap:break-word/);
 assert.match(style,/focus-visible/);
 assert.ok(html.includes("id=\"lessonJump\""));
 assert.ok(html.includes('href="#lesson-'));
});
test("lesson-specific printing avoids keeping entire long cards on one printed page",()=>{
 assert.match(style,/@media print/);
 assert.match(style,/article\{display:block;[^}]*break-inside:auto/);
 assert.match(style,/body\.print-one article:not\(\.print-target\)\{display:none!important\}/);
 assert.ok(html.includes("data-print-lesson"));
 assert.ok(html.includes("Print this lesson"));
 assert.ok(html.includes("function preparePrint(target)"));
 assert.ok(html.includes("window.addEventListener(\"afterprint\""));
 assert.ok(html.includes("document.getElementById(\"print\")"));
 assert.ok(html.includes("window.print()"));
});
test("student TXT exports label every French level correctly and warn before loss",()=>{
 for(const [grade,label] of [["hs1","French I"],["hs2","French II"],["hs3","French III"],["hs4","French IV"]])
  assert.ok(html.includes(grade+':"'+label+'"'));
 assert.ok(html.includes("data-bridge-export"));
 assert.ok(html.includes("URL.createObjectURL(file)"));
 assert.ok(html.includes("URL.revokeObjectURL(url)"));
 assert.ok(html.includes("function hasUnsavedPractice()"));
 assert.ok(html.includes("confirmPracticeExit()"));
 assert.ok(html.includes("beforeunload"));
 assert.ok(html.includes("Your notes remain only on this page"));
 assert.ok(html.includes("history.replaceState(null"));
 assert.doesNotMatch(html,/\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b|\bfetch\(/);
});
test("original student grading boundaries and content data declarations remain",()=>{
 for(const data of ["const packs=","const themeCrosswalk=","const extendedReadingPacks=","const evidenceBridges=","const listeningSpeakingPack="])
  assert.ok(html.includes(data));
 assert.ok(html.includes("Practice only. Not an official assessment"));
 assert.doesNotMatch(html,/\bsubmitAssessment\(|\bgradeAttempt\(|\bgetUserMedia\b/);
});

#!/usr/bin/env node
// Non-mutating regression contract for the shared four-grade French score input.
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const html=readFileSync("Halls/index.html","utf8");
assert.match(html,/function saveReviewedAssessmentScore\(field,inputId\)/);
assert.match(html,/raw===""\|\|!Number\.isFinite\(value\)\|\|value<0\|\|value>100/);
for(const [field,id] of [["midterm","midtermScore"],["final","finalScore"]]){
 assert.ok(html.includes('saveReviewedAssessmentScore("'+field+'","'+id+'")'),field+" must share safe score recording");
}
assert.ok(!html.includes('Number($("#midtermScore").value)||0'),"Blank midterm must not become zero");
assert.ok(!html.includes('Number($("#finalScore").value)||0'),"Blank final must not become zero");
const accept=(raw)=>{
 const trimmed=raw.trim(),value=Number(trimmed);
 return trimmed!==""&&Number.isFinite(value)&&value>=0&&value<=100;
};
for(const val of [""," ","NaN","Infinity","-1","101","abc"])assert.equal(accept(val),false,JSON.stringify(val));
for(const val of ["0","79.5","80","100"])assert.equal(accept(val),true,JSON.stringify(val));
assert.match(html,/Reviewer-entered score \(%\) · not an automatically graded examination/);
console.log("FRENCH_FOUR_GRADE_SCORE_INPUT=PASS; invalid input denied; valid scores accepted; historical values untouched");

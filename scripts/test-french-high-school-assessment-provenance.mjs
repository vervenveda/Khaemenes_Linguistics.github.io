#!/usr/bin/env node
// Read-only regression for manual grading provenance; never reclassify old records.
import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
const html=readFileSync("Halls/index.html","utf8");
const tests=[
 ["four-grade scope", 'state.activeLanguage==="french"&&["hs1","hs2","hs3","hs4"].includes(state.activeCourse)'],
 ["versioned audit key", "assessmentEntryProvenanceV1"],
 ["manual source", 'source:"reviewer-entered-local-record"'],
 ["schema", 'schema:"french-high-school-manual-score-v1"'],
 ["record timestamp", "recordedAt:new Date().toISOString()"],
 ["not independently verified", "assessmentVerified:false"],
 ["legacy scores not converted", "historical / unclassified score"],
 ["manual disclosure", "These entries are not verified auto-scored examinations."],
 ["completion disclosure", "local historical/portfolio record"],
 ["historical percent preserved", "r[field]=value;"],
 ["original completion flag", "r.complete=true;save();renderCourse();renderAcademy();renderVault()"]
];
for(const [label,token] of tests)assert.ok(html.includes(token),label+" missing");
assert.ok(!html.includes("assessmentVerified:true"),"Manual scores must never claim verified mastery");
console.log("FRENCH_HIGH_SCHOOL_PROVENANCE=PASS; four courses share disclosure; historical completion unchanged");

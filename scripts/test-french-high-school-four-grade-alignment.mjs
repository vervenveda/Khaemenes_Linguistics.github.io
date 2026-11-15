#!/usr/bin/env node
// French I-IV: one synchronized high-school course contract.
// Read-only regression: never mutates learner records or lesson source.
import {readFileSync} from "node:fs";
import assert from "node:assert/strict";

const html=readFileSync("Halls/index.html","utf8");
const match=html.match(/<script[^>]*id="appData"[^>]*>([\s\S]*?)<\/script>/);
assert.ok(match,"Formal Hall appData must be present");
const app=JSON.parse(match[1]);
const tracks=[
  ["hs1","French I"],
  ["hs2","French II"],
  ["hs3","French III"],
  ["hs4","French IV"]
];
assert.equal(new Set(app.levels.map(l=>l.id)).size,app.levels.length,"Duplicate course IDs");
assert.equal(app.languages.french.stages.length,app.levels.length,"French stage/level indexing mismatch");
for(const [id,name] of tracks){
  const index=app.levels.findIndex(l=>l.id===id);
  assert.ok(index>=0,name+" level missing");
  const level=app.levels[index];
  const stage=app.languages.french.stages[index];
  assert.equal(level.weeks,36,name+" must remain a 36-week high-school course");
  assert.ok(stage.title.startsWith(name+" ·"),name+" stage title mismatch");
  assert.equal(stage.themes.length,6,name+" must contain six distinct six-week themes");
  assert.equal(new Set(stage.themes).size,6,name+" themes must be distinct");
  for(const field of ["forms","literacy","culture","performance"]){
    assert.ok(typeof stage[field]==="string"&&stage[field].trim().length>=35,name+" missing substantive "+field);
  }
}
for(const id of ["101","102","201","202"]){
  const index=app.levels.findIndex(l=>l.id===id);
  assert.ok(index>=0,"French college "+id+" level missing");
  assert.ok(app.languages.french.stages[index].title.startsWith("French "+id+" ·"),"French college "+id+" title mismatch");
}
assert.match(html,/\["101","102","201","202"\]\.includes\(state\.activeCourse\)\?18:level\(\)\.weeks/,"French college 18-week override missing");
assert.match(html,/if\(l\.weeks===36\)/,"36-week school course branch missing");
assert.match(html,/state\.activeLanguage==="french"&&state\.activeCourse==="101"/,"French 101 dedicated branch missing");
console.log("FRENCH_HIGH_SCHOOL_ALIGNMENT=PASS; four grades=4/4; 36-week programs=4/4; six themes=4/4; college routes=4/4; records untouched");

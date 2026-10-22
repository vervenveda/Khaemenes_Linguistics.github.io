import fs from "node:fs";
import assert from "node:assert/strict";

const hall=fs.readFileSync("Halls/index.html","utf8");

assert.match(hall,/new URLSearchParams\(location\.search\)/,"Linguistics Hall reads incoming route parameters");
assert.match(hall,/handoffParams\.get\("language"\)/,"Hall reads requested language");
assert.match(hall,/handoffParams\.get\("course"\)/,"Hall reads requested course");
assert.match(hall,/APP\.languages\[requestedLanguage\]/,"formal language handoff resolves against current full programs");
assert.match(hall,/state\.activeLanguage=requestedLanguage/,"formal language handoff selects the requested program");
assert.match(hall,/APP\.levels\.some\(x=>x\.id===requestedCourse\)/,"requested course is validated before selection");
assert.match(hall,/requestedAtlasLanguage=requestedLanguage/,"non-formal language requests fall back to Atlas exploration");
assert.match(hall,/showPanel\("atlas",false\)/,"exploration handoff opens the Atlas");
assert.match(hall,/showPanel\("course",false\)/,"formal High School handoff opens the course workspace");

console.log("PASS High School → Linguistics language/course handoff contract.");

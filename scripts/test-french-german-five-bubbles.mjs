import fs from "node:fs";import assert from "node:assert/strict";import vm from "node:vm";
const fr=fs.readFileSync("apps/French_101_index.html","utf8"),de=fs.readFileSync("apps/German_coach_index.html","utf8");
for(const [name,html,lang] of [["French 101",fr,"fr"],["German Coach",de,"de"]]){
 assert.match(html,/name="viewport"/,name+" viewport");
 assert.match(html,/@media\(max-width:320px\)/,name+" narrow-screen controls");
 assert.match(html,/vnv-language\.js/,name+" canonical interface translator");
 assert.match(html,/data-i18n-ignore/,name+" protection of target-language lesson examples");
 assert.match(html,/academyAudioStatus/,name+" accessible audio status");
 assert.match(html,/utterance\.onerror/,name+" speech failure fallback");
 assert.match(html,/if\(!voice\)/,name+" missing voice fallback");
 assert.match(html,/serviceWorker\.register/,name+" offline entry");
}
assert.match(fr,/function available\(level\)/,"French prerequisite gate");
assert.match(fr,/score>=Math\.ceil\(set\.length\*\.8\)/,"French 80% lesson pass");
assert.match(fr,/score>=8/,"French 8-of-10 final");
assert.match(fr,/progress\.examPassed/,"French exam saved state");
assert.match(fr,/function openCertificate/,"French certificate gating");
assert.match(fr,/french101_active_learner/,"French learner scoping");
assert.match(fr,/function validate\(data\)/,"French backup validation");
assert.match(de,/function coachLearnerId\(\)/,"German learner scope");
assert.match(de,/function coachKey\(key\)/,"German keyed storage");
assert.match(de,/id="passThreshold"/,"German adjustable practice threshold");
assert.match(de,/completed\.add\(currentDay\)/,"German day completion");
assert.match(de,/function validateCoachImport\(input\)/,"German backup verification");
assert.match(de,/function replaceCoachPortfolioSafely/,"German transactional import");
console.log("FRENCH_GERMAN_FIVE_BUBBLE_SOURCE_GATE=PASS (static assertions; browser testing separate)");

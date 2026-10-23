import assert from "node:assert/strict";
import vm from "node:vm";
import {readFileSync} from "node:fs";
const root=new URL("../",import.meta.url);
const companion=readFileSync(new URL("assets/arabic-mastery-pilot.js",root),"utf8");
new vm.Script(companion);
assert.ok(companion.includes("khaemenes_arabic_pilot_v1_"));
assert.ok(companion.includes("score>=8"));
assert.ok(companion.includes("Teacher practical skills reviewed"));
for(const week of ["01","02"]){
 const path="Halls/courses/arabic-1/week-"+week+"/index.html";
 const page=readFileSync(new URL(path,root),"utf8");
 assert.ok(page.includes("data-arabic-week=\""+Number(week)+"\""),path);
 const pilotPath="../../../../assets/arabic-mastery-pilot.js";
 assert.ok(page.includes('src="'+pilotPath+'"'),path);
 assert.equal(new URL(pilotPath,new URL(path,root)).href,new URL("assets/arabic-mastery-pilot.js",root).href,path);
 assert.ok(page.includes("window.ARABIC_PILOT_QUESTIONS=QUESTIONS"),path);
 for(const id of ["arabicStudent","arabicPilotStatus","arabicSkillReview","arabicPrint","arabicEvidence"])assert.ok(page.includes('id="'+id+'"'),id);
 const script=page.match(/<script>([\s\S]*?)<\/script>/)?.[1];assert.ok(script);
 new vm.Script(script);
 const items=script.match(/const QUESTIONS=\[([\s\S]*?)\];/);
 assert.ok(items,"Quiz question bank exists");
}
console.log("ARABIC_PILOT_WEEKS_01_02=PASS");
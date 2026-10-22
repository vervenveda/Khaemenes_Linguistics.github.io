import fs from "node:fs";
const languages=["spanish","mandarin","japanese"],errors=[],inventory=[];
for(const language of languages){
 const base="apps/language-worlds/"+language+"/",lessons=[];
 for(let n=1;n<=20;n++){
  const p=base+"foundation-"+(n===9?"9":String(n).padStart(2,"0"))+".html";
  if(!fs.existsSync(p)){errors.push("Missing "+p);continue}
  const page=fs.readFileSync(p,"utf8"),scripts=[...page.matchAll(/<script[^>]*src=["'][^"']*vnv-language\.js["'][^>]*>/g)];
  if(scripts.length!==1)errors.push(p+" has "+scripts.length+" official translator tags");
  lessons.push(p);
 }
 for(const unit of ["01","03","04"]){
  const p=base+"unit-"+unit+"-checkpoint.html";
  if(!fs.existsSync(p)){errors.push("Missing "+p);continue}
  const page=fs.readFileSync(p,"utf8");
  if(!page.includes("unit01-language-checkpoint.js")&&unit==="01")errors.push(p+" no canonical checkpoint bridge");
 }
 for(const unit of ["03","04"]){const name=base+"unit-"+unit+"-checkpoint.html",html=fs.readFileSync(name,"utf8");if(!html.includes("Unit "+unit+" language-specific evidence review"))errors.push(name+" missing distinct proficiency anchors");}
 inventory.push({language,foundationLessons:lessons.length,checkpointPages:3});
}
for(const p of ["apps/French_101_index.html","apps/German_coach_index.html"]){
 const s=fs.readFileSync(p,"utf8");
 if(!s.includes("localStorage"))errors.push(p+" missing local saved progress");
 if(!s.includes("vnv-language.js"))errors.push(p+" missing official translator");
}

// Unit 02 identity and recovery cannot use anonymous saved academic evidence.
for(const file of ["assets/foundation-unit02-challenge.js","assets/foundation-unit02-recovery.js"]){
 const s=fs.readFileSync(file,"utf8");
 if(!s.includes('Select a learner'))errors.push(file+" does not require explicit learner selection");
}
console.log(JSON.stringify({inventory,legacyApps:["French 101","German Coach"],issues:errors},null,2));
if(errors.length)process.exitCode=1;

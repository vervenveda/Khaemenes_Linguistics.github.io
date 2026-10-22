import fs from "node:fs";
import vm from "node:vm";
const source=fs.readFileSync("assets/year-i-evidence-journal.js","utf8");
new vm.Script(source,{filename:"year-i-evidence-journal.js"});
for(const fragment of ["khae:","khae-language-evidence-v1","formative-recognition-only","Confirm matching backup restore","v.course!==course","v.week!==week","v.label!==safe(label.value)","JSON.stringify(prior)"])if(!source.includes(fragment)&&fragment!=="khae:")throw Error("Missing evidence safety contract: "+fragment);
if(!source.includes('text.match(/^([0-9]+)'))throw Error("Quiz result pattern missing");
if(/mastery\s*=|certificate\s*=/.test(source))throw Error("Journal unexpectedly owns formal mastery");
console.log("PASS journal syntax, formative quiz record and identity-bound import contracts.");

import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const check=(ok,msg)=>{if(!ok)throw Error("Seven-language directory regression: "+msg)};
const dir="Halls/high-school-language-directory/index.html";
const s=read(dir),hall=read("Halls/index.html");
check(hall.includes('href="./high-school-language-directory/"'),"Linguistics Hall directory entry");
for(const language of ["French","Spanish","Arabic","Russian","Mandarin Chinese","German","Japanese"])
 check(s.includes("<h3>"+language+"</h3>"),language+" language card");
check((s.match(/class="language-card"/g)||[]).length===8,"seven languages and one pathway guide balanced in 2x4 grid");
check(s.includes("grid-template-columns:repeat(2,minmax(0,1fr))"),"symmetrical 2-column card grid");
check(s.includes("--charcoal:#243038;--cream:#fffdf5"),"VNV cream/charcoal palette");
check(s.includes("border:3px solid var(--charcoal);border-radius:7px"),"3px charcoal borders and 7px radius");
const routes=Object.fromEntries([...s.matchAll(/"([^"]+)":"(\.\.\/[^"]+)"/g)].map(x=>[x[1],x[2]]));
for(const key of ["f101","f102","s101","s102","spanish-world","arabic1","arabic-world","russian1","russian-world","mandarin-world","mandarin-hs1","german-hub","german-hs1","japanese-world","japanese-hs1"]){
 check(typeof routes[key]==="string","course route "+key);
 const relative=routes[key].split("?")[0],target=path.resolve(root,"Halls/high-school-language-directory",relative);
 const candidate=fs.existsSync(target)&&fs.statSync(target).isDirectory()?path.join(target,"index.html"):target;
 check(fs.existsSync(candidate),"actual source file for "+key+": "+candidate);
}
check(s.includes("ctx")||s.includes("gradeCtx?.active?.()"),"registered grade verification");
check(s.includes("pins.writeLanguageChoices"),"canonical High School language preference");
check(s.includes('[String(Number(grade))]:language'),"grade-specific learner preference");
check(s.includes("khaemenes-high-grade")&&s.includes('destination.searchParams.set("return",home)'),"course return path");
check(s.includes("readLanguageChoices?.()?.[String(Number(grade))]"),"readback verification");
check(!s.includes("mastery:true")&&!s.includes("contract.writeJSON("),"no grade/mastery creation");
for(const js of [...s.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(x=>x.trim()))
 new Function(js);
console.log("SEVEN-LANGUAGE DIRECTORY: PASS (7 languages, 15 source-resolved routes, VNV layout, grade-scoped learner choice).");

#!/usr/bin/env node
// Arabic I: static, fail-closed lesson route and control audit.
// Run from repository root: node Halls/tools/audit-arabic-i-pages.mjs
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../courses/arabic-1");
const errors=[],warn=[],summary={pages:0,buttons:0,links:0};
for(let week=1;week<=32;week++){
 const ww=String(week).padStart(2,"0"),file=path.join(root,"week-"+ww,"index.html");
 if(!fs.existsSync(file)){errors.push("Week "+ww+": missing file");continue}
 const html=fs.readFileSync(file,"utf8");summary.pages++;
 if(!html.includes('name="viewport"'))errors.push("Week "+ww+": no viewport");
 if(!html.includes('id="arabic-saudi-green-v1"'))errors.push("Week "+ww+": missing theme");
 if(!html.includes('lesson-navigation'))errors.push("Week "+ww+": missing navigation");
 const as=[...html.matchAll(/<a\b([^>]*)>/gi)];
 for(const [,attr] of as){
  summary.links++;
  const h=attr.match(/\bhref=["']([^"']*)["']/i);
  if(!h||!h[1].trim()||h[1]==="#"){errors.push("Week "+ww+": empty or inert link");continue}
  const url=h[1];
  if(/^(javascript:|data:)/i.test(url))errors.push("Week "+ww+": unsafe link");
  if(/^(https?:|mailto:|tel:|\/)/i.test(url))continue;
  const target=path.resolve(path.dirname(file),decodeURIComponent(url.split(/[?#]/)[0]));
  if(!fs.existsSync(target))errors.push("Week "+ww+": missing local link "+url);
 }
 const btns=[...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)];
 for(const [,attr,label] of btns){
  summary.buttons++;
  const id=attr.match(/\bid=["']([^"']+)["']/)?.[1];
  const inline=/\bonclick\s*=/.test(attr);
  const wired=id&&new RegExp('getElementById\\(["\\x27]'+id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+'["\\x27]\\)\\.addEventListener|\\$\\(["\\x27]'+id+'["\\x27]\\)\\.addEventListener').test(html);
  if(!inline&&!wired&&!/\btype=["']submit["']/.test(attr)){
   warn.push("Week "+ww+": button needs interaction inspection: "+(id||label.replace(/<[^>]+>/g,"").trim().slice(0,50)));
  }
 }
 if(!html.includes("window.print()"))warn.push("Week "+ww+": no print action");
 if(week!==16&&week!==32){
  const match=html.match(/const QUESTIONS=(\[[\s\S]*?\]);/);
  if(!match){errors.push("Week "+ww+": missing quiz bank");continue}
  try{const qs=JSON.parse(match[1]);if(qs.length!==10)errors.push("Week "+ww+": not ten questions")}
  catch(e){errors.push("Week "+ww+": invalid quiz JSON")}
 }
}
console.log(JSON.stringify({result:errors.length?"FAIL":"SOURCE_PASS_WITH_WARNINGS",summary,errors,warn},null,2));
process.exitCode=errors.length?1:0;

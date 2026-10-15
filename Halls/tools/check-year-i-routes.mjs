#!/usr/bin/env node
/**
 * Arabic I / Russian I static regression — Node built-ins only.
 * Usage: node Halls/tools/check-year-i-routes.mjs
 * Does not replace browser, screen-reader or linguistic review.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../courses');
const errors=[], stats={pages:0,quizPages:0,questions:0,navPages:0};
for(const lang of ['arabic','russian']){
  const course=path.join(root,lang+'-1');
  const navPage=path.join(course,'index.html');
  if(!fs.existsSync(navPage)) errors.push('Missing course index: '+navPage);
  for(let w=1;w<=32;w++){
    const nn=String(w).padStart(2,'0');
    const file=path.join(course,'week-'+nn,'index.html');
    if(!fs.existsSync(file)){errors.push('Missing '+lang+' week '+nn);continue;}
    stats.pages++;
    const s=fs.readFileSync(file,'utf8');
    const nav=s.match(/<div class="lesson-navigation"[\s\S]*?<\/div>/);
    if(!nav){errors.push(lang+' '+nn+': missing lesson-navigation');}
    else {
      stats.navPages++;
      const needed=['../index.html'];
      if(w>1) needed.push('../week-'+String(w-1).padStart(2,'0')+'/index.html');
      if(w<32) needed.push('../week-'+String(w+1).padStart(2,'0')+'/index.html');
      for(const link of needed){
        if(!nav[0].includes('href="'+link+'"')) errors.push(lang+' '+nn+': missing nav '+link);
        const target=path.resolve(path.dirname(file),link);
        if(!fs.existsSync(target)) errors.push(lang+' '+nn+': dead nav '+link);
      }
    }
    if(!s.includes('window.print()')) errors.push(lang+' '+nn+': missing print action');
    if(w===16||w===32){
      if(!s.includes('Reading')||!s.includes('Listening')||!s.includes('Speaking')||!s.includes('Writing')) errors.push(lang+' '+nn+': assessment framework missing domain');
      continue;
    }
    const m=s.match(/const QUESTIONS=(\[[\s\S]*?\]);/);
    if(!m){errors.push(lang+' '+nn+': missing question bank');continue;}
    let qs;
    try{qs=JSON.parse(m[1]);}catch(e){errors.push(lang+' '+nn+': invalid question JSON: '+e.message);continue;}
    stats.quizPages++;stats.questions+=qs.length;
    if(qs.length!==10) errors.push(lang+' '+nn+': '+qs.length+' questions, expected 10');
    if(new Set(qs.map(q=>q[0])).size!==qs.length) errors.push(lang+' '+nn+': duplicated prompts');
    qs.forEach((q,i)=>{if(!Array.isArray(q[1])||!Number.isInteger(q[2])||q[2]<0||q[2]>=q[1].length) errors.push(lang+' '+nn+' question '+(i+1)+': invalid key');});
  }
}
console.log(JSON.stringify({status:errors.length?'FAIL':'PASS',stats,errors},null,2));
process.exitCode=errors.length?1:0;

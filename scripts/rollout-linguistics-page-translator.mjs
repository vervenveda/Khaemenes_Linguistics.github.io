#!/usr/bin/env node
// Idempotent first-party interface translator and Year I lesson navigation rollout.
import fs from "node:fs";
import path from "node:path";
const root=process.cwd(),apply=process.argv.includes("--apply");
const skipped=new Set([".git","node_modules","vendor","dist","build"]);
let count=0,withTranslator=0,changed=0,missingBody=[],weekNav=0;
const proposedChanges=[], isolatedPages=[];
let actualTranslatorPages=0;
const isolationPolicy=new Map([
 ['Halls/french-high-school-unit01-instruction.html','standalone instructional practice and draft isolation'],
 ['apps/french-101-worksheets/lesson-01.html','printable instructional worksheet'],
 ['apps/vocabulary-mini-cloud/index.html','encrypted owner vault']
]);
const translatorTags=html=>[...html.matchAll(/<script\b[^>]*\bsrc=["'][^"']*\/vnv-language\.js(?:[?#][^"']*)?["'][^>]*>\s*<\/script>/gi)];
function walk(dir){
 for(const e of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,e.name);
  if(e.isDirectory()){if(!skipped.has(e.name))walk(file);continue;}
  if(!e.isFile()||!/.html?$/i.test(e.name))continue;
  count++;
  const relative=path.relative(root,file).split(path.sep).join("/");
  let html=fs.readFileSync(file,"utf8"),next=html;
  const reasons=[];
  // A compatibility redirect has no independent translation surface.
  if(relative==="multilingual-translator_index.html"&&/location\.replace\(next\.href\)/.test(html)){count--;continue;}
  if(isolationPolicy.has(relative)){
   isolatedPages.push({path:relative,reason:isolationPolicy.get(relative)});
   if(translatorTags(html).length){changed++;proposedChanges.push({path:relative,reasons:['translator prohibited on isolated surface']});}
   continue;
  }
  if(translatorTags(html).length===1)actualTranslatorPages++;
  if(!translatorTags(html).length){
   reasons.push("missing canonical translator script tag");
   // App fragments with no body tag receive an appended standalone script.
   const href=path.posix.relative(path.posix.dirname(relative),"assets/vnv-language.js");
   const src=href.startsWith(".")?href:"./"+href;
   const tag='<\!-- VNV_OFFICIAL_SITE_TRANSLATOR -->\n<script defer src="'+src+'"></script>'; 
   next=/<\/body\s*>/i.test(next)?next.replace(/<\/body\s*>/i,tag+'\n</body>'):next+'\n'+tag+'\n';
  }
  // Keep only the first canonical interface translator script tag.
  if(next.includes("vnv-language.js")){
   const tags=translatorTags(next);
   if(tags.length>1)reasons.push("duplicate canonical translator tags: "+tags.length);
  }
  if(/\bHalls\/courses\/(arabic-1|russian-1)\/week-\d{2}\/index\.html$/.test(relative)){
   const match=relative.match(/(arabic-1|russian-1)\/week-(\d{2})\/index\.html$/);
   const n=Number(match[2]);
   if(!/data-year-i-week-navigation|class=["']lesson-navigation["']/.test(next)){
    reasons.push("missing weekly navigation");
    const nav='<nav data-year-i-week-navigation aria-label="Course week navigation" style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin:18px auto;padding:10px">'+
      (n>1?'<a href="../week-'+String(n-1).padStart(2,"0")+'/index.html">← Previous week</a>':'')+
      '<a href="../index.html">All course weeks</a>'+
      (n<32?'<a href="../week-'+String(n+1).padStart(2,"0")+'/index.html">Next week →</a>':'')+'</nav>';
    // A week directory is a direct child of its course directory.
    next=next.replace(/<\/body\s*>/i,nav+'\n</body>');
   }
   if(!next.includes("year-i-evidence-journal.js")){
    reasons.push("missing evidence journal");
    next=next.replace(/<\/body\s*>/i,'<script defer src="../../../../assets/year-i-evidence-journal.js"></script>\\n</body>');
   }
   next=next.replace(/<\/script>\\\\n<\/body>/g,"</script>\\n</body>");
   if(!next.includes("year-i-teacher-review.js"))next=next.replace(/<\/body\s*>/i,'<script defer src="../../../../assets/year-i-teacher-review.js"></script>\n</body>');
   weekNav++;
  }
  if(translatorTags(next).length===1)withTranslator++;
  if(next!==html||reasons.length){
   changed++;proposedChanges.push({path:relative,reasons:reasons.length?reasons:["markup or companion normalization"],translatorScripts:translatorTags(html).map(m=>m[0])});
   if(apply&&next!==html&&!reasons.some(r=>r.startsWith("duplicate canonical")))fs.writeFileSync(file,next);
  }
 }
}
walk(root);
console.log(JSON.stringify({htmlPages:count,translatorPages:actualTranslatorPages,proposedTranslatorPages:withTranslator,isolatedPages,yearOneWeeks:weekNav,filesModified:changed,proposedChanges,missingBody},null,2));
if(missingBody.length||withTranslator+isolatedPages.length!==count||isolatedPages.length!==isolationPolicy.size||weekNav!==64)process.exitCode=1;
if((!apply&&changed)||proposedChanges.some(x=>isolationPolicy.has(x.path)))process.exitCode=1;

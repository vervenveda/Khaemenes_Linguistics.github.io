#!/usr/bin/env node
// Idempotent first-party interface translator and Year I lesson navigation rollout.
import fs from "node:fs";
import path from "node:path";
const root=process.cwd(),apply=process.argv.includes("--apply");
const skipped=new Set([".git","node_modules","vendor","dist","build"]);
let count=0,withTranslator=0,changed=0,missingBody=[],weekNav=0;
function walk(dir){
 for(const e of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,e.name);
  if(e.isDirectory()){if(!skipped.has(e.name))walk(file);continue;}
  if(!e.isFile()||!/.html?$/i.test(e.name))continue;
  count++;
  const relative=path.relative(root,file).split(path.sep).join("/");
  let html=fs.readFileSync(file,"utf8"),next=html;
  if(!/vnv-language\.js(?:[?#]|["'])/i.test(html)){
   // App fragments with no body tag receive an appended standalone script.
   const href=path.posix.relative(path.posix.dirname(relative),"assets/vnv-language.js");
   const src=href.startsWith(".")?href:"./"+href;
   const tag='<\!-- VNV_OFFICIAL_SITE_TRANSLATOR -->\n<script defer src="'+src+'"></script>'; 
   next=/<\/body\s*>/i.test(next)?next.replace(/<\/body\s*>/i,tag+'\n</body>'):next+'\n'+tag+'\n';
  }
  // Repair duplicate canonical tag from earlier site-wide installation, preserving the first script.
  if(/vnv-language\\.js/i.test(next)){
   let seen=false;
   next=next.replace(/<script\\b[^>]*\\bsrc=["'][^"']*vnv-language\\.js["'][^>]*><\\/script>/gi,tag=>{
    if(seen)return "";seen=true;return tag;
   });
  }
  if(/\bHalls\/courses\/(arabic-1|russian-1)\/week-\d{2}\/index\.html$/.test(relative)){
   const match=relative.match(/(arabic-1|russian-1)\/week-(\d{2})\/index\.html$/);
   const n=Number(match[2]);
   if(!/data-year-i-week-navigation/.test(next)){
    const nav='<nav data-year-i-week-navigation aria-label="Course week navigation" style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin:18px auto;padding:10px">'+
      (n>1?'<a href="../week-'+String(n-1).padStart(2,"0")+'/index.html">← Previous week</a>':'')+
      '<a href="../index.html">All course weeks</a>'+
      (n<32?'<a href="../week-'+String(n+1).padStart(2,"0")+'/index.html">Next week →</a>':'')+'</nav>';
    // All week lesson files live one level below week directory; course index is ../../index.html.
    const fixed=nav.replace('href="../index.html"','href="../../index.html"');
    next=next.replace(/<\/body\s*>/i,fixed+'\n</body>');
   }
   if(!next.includes("year-i-evidence-journal.js")){
    next=next.replace(/<\/body\s*>/i,'<script defer src="../../../../assets/year-i-evidence-journal.js"></script>\\n</body>');
   }
   next=next.replace(/<\/script>\\\\n<\/body>/g,"</script>\\n</body>");
   if(!next.includes("year-i-teacher-review.js"))next=next.replace(/<\/body\s*>/i,'<script defer src="../../../../assets/year-i-teacher-review.js"></script>\n</body>');
   weekNav++;
  }
  if(/vnv-language\.js(?:[?#]|["'])/i.test(next))withTranslator++;
  if(next!==html){changed++;if(apply)fs.writeFileSync(file,next);}
 }
}
walk(root);
console.log(JSON.stringify({htmlPages:count,translatorPages:withTranslator,yearOneWeeks:weekNav,filesModified:changed,missingBody},null,2));
if(missingBody.length||withTranslator!==count||weekNav!==64)process.exitCode=1;
if(!apply&&changed)process.exitCode=1;

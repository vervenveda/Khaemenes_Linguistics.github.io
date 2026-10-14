#!/usr/bin/env node
/* Browser smoke test for the exact public index.html and shared locale module.
   Test-only: no dependencies in the published website. Does not validate content quality. */
import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import {spawnSync,spawn} from "node:child_process";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const browsers=["google-chrome","chromium","chromium-browser"];
const browser=browsers.find(x=>spawnSync("which",[x],{encoding:"utf8"}).status===0);
if(!browser){console.error("BROWSER_TRANSLATOR=FAIL: Chromium or Chrome unavailable");process.exit(1)}
const testCode=String.raw`
<script data-test-only>
(function(){
 function verify(){
  const checks={};
  try{
   const api=window.KhaemenesSovereignTranslate;
   checks.engine=!!api;
   checks.version=window.KhaemenesInterlingual?.version==="2.6";
   checks.content=api?.dictionaryStats?.().allRecords===434&&api?.dictionaryStats?.().creativeVocabulary===553;
   checks.definitions=api.lookupDefinition("alliteration").length>0;
   checks.synonyms=api.lookupThesaurus("zeugma").related.some(x=>x.direct);
   checks.reverse=api.lookupLocal({from:"fr",to:"en",text:"chat"})?.translation==="cat";
   checks.ui=!!document.getElementById("thesaurusResults")&&!!document.getElementById("draftResults");
   document.getElementById("dictionaryQuery").value="alliteration";
   document.getElementById("dictionarySearchBtn").click();
   checks.dictionaryResults=document.getElementById("dictionaryResults").children.length>0;
   document.getElementById("thesaurusQuery").value="zeugma";
   document.getElementById("thesaurusSearchBtn").click();
   checks.thesaurusResults=document.getElementById("thesaurusResults").children.length>0;
   const term="localtestword"+String(Date.now());
   document.getElementById("draftTerm").value=term;
   document.getElementById("draftDefinition").value="A test-only local draft.";
   document.getElementById("draftRelated").value="practice, test";
   document.getElementById("lexiconDraftForm").dispatchEvent(new Event("submit",{bubbles:true,cancelable:true}));
   const record=api.listLocalEntries().find(x=>x.term===term);
   checks.draftSave=!!record;
   checks.draftRendered=document.getElementById("draftResults").textContent.includes(term);
   checks.draftRelated=api.lookupThesaurus(term).related.some(x=>x.term==="practice");
   if(record)api.removeLocalEntry(record.id);
   document.body.dataset.translatorSmoke=Object.values(checks).every(Boolean)?"PASS":"FAIL";
   document.body.dataset.translatorDetails=JSON.stringify(checks);
  }catch(e){document.body.dataset.translatorSmoke="FAIL";document.body.dataset.translatorDetails=String(e.message)}
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(verify,400),{once:true});
 else setTimeout(verify,400);
})();
</script>
`;
const mime={".html":"text/html",".js":"text/javascript",".json":"application/json",".css":"text/css",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"};
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,"http://127.0.0.1").pathname);
  const p=path.resolve(root,"."+pathname);
  if(!p.startsWith(root+path.sep)&&p!==root){res.writeHead(403);res.end();return}
  let file=p;if(!path.extname(file))file=path.join(file,"index.html");
  fs.readFile(file,(err,body)=>{
    if(err){res.writeHead(404);res.end("not found");return}
    const isHome=pathname==="/apps/translator.html";
    let content=body;
    if(isHome){
      const page=body.toString("utf8"),at=page.lastIndexOf("</body>");
      if(at<0)throw Error("HTML missing closing body");
      content=Buffer.from(page.slice(0,at)+testCode+"\n"+page.slice(at));
    }
    res.writeHead(200,{"Content-Type":(mime[path.extname(file)]||"application/octet-stream")+"; charset=utf-8","Cache-Control":"no-store"});
    res.end(content);
  });
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const port=server.address().port;
const result=await new Promise(resolve=>{
 let stdout="",stderr="",ended=false;
 const child=spawn(browser,["--headless=new","--no-sandbox","--disable-gpu","--disable-dev-shm-usage","--no-first-run","--no-default-browser-check","--virtual-time-budget=6500","--dump-dom","http://127.0.0.1:"+port+"/apps/translator.html"]);
 const stop=setTimeout(()=>{if(!ended)child.kill("SIGKILL")},25000);
 child.stdout.on("data",chunk=>{stdout+=chunk.toString()});
 child.stderr.on("data",chunk=>{if(stderr.length<20000)stderr+=chunk.toString()});
 child.on("error",error=>{ended=true;clearTimeout(stop);resolve({status:1,error,stdout,stderr})});
 child.on("close",status=>{if(ended)return;ended=true;clearTimeout(stop);resolve({status,stdout,stderr})});
});
server.close();
const page=result.stdout||"";
const marker=page.match(/data-translator-smoke="([^"]+)"/);
const details=page.match(/data-translator-details="([^"]+)"/);
if(result.error||result.status!==0||marker?.[1]!=="PASS"){
 console.error("BROWSER_TRANSLATOR=FAIL",{status:result.status,result:marker?.[1],details:details?.[1],error:result.error?.message,stderr:(result.stderr||"").slice(-1200)});
 process.exitCode=1;
}else console.log("BROWSER_TRANSLATOR=PASS; definitions, thesaurus, local drafts, bilingual reverse translation and UI");

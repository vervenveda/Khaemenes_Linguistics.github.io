import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const translator=read("apps/translator.html");
const entry=read("apps/translator-entry.html");
const campus=read("index.html");
const bridge=read("assets/pierre-translator-mentor-v1.js");
const core=JSON.parse(read("assets/pierre-core-profile.v1.json"));
const chat="https://artist1970.github.io/Pierre.gihub.io/#talk";
test("Pinned PierreCore public identity cannot authorize privileged actions",()=>{
 assert.equal(core.schema,"pierre-public-core-profile-v1");
 assert.equal(core.mentorId,"pierre");
 assert.equal(core.source.repository,"artist1970/CORE");
 assert.equal(core.source.path,"PierreCore/AI_CORE_MANIFEST.json");
 assert.equal(core.source.gitBlobSha,"dee9019c0e37be778b556a30f7cde3a271b46192");
 for(const p of ["delegatedAdministrativeAuthority","protectedRuntimeAccess","consequentialExecution"]){
  assert.equal(core.authority[p],false);
 }
 assert.equal(core.synchronization.automaticDraftPublication,false);
 assert.equal(core.synchronization.privateCloudAccess,false);
});
test("Translator, entry and campus reach Pierre's actual chat without competing chat engine",()=>{
 for(const [name,html] of [["Translator",translator],["Entry",entry],["Campus",campus]]){
  assert.ok(html.includes(chat),name+" missing direct chat link");
 }
 assert.match(translator,/id="pierreMentor"/);
 assert.match(translator,/label:"Pierre"/);
 assert.match(entry,/label:"Pierre"/);
 assert.match(translator,/Open Pierre's Chat/);
 assert.match(entry,/Open Pierre's Chat/);
 assert.match(campus,/id="pierre-linguistics-mentor"/);
 assert.ok(!translator.includes("pierre-conversation-v1.js"),"must not duplicate the chat implementation");
});
test("Existing translator source and review controls remain owned by the same engine",()=>{
 assert.match(translator,/id="langFrom"/);
 assert.match(translator,/id="langTo"/);
 assert.match(translator,/id="translateBtn"/);
 assert.match(translator,/id="saveBtn"/);
 assert.match(translator,/id="candidateLearningHeading"/);
 assert.match(translator,/khaemenes-interlingual-core.js/);
 assert.match(translator,/khaemenes-translator-loader.js/);
 assert.match(translator,/pierre-translator-mentor-v1.js/);
});
test("Pierre manual bridge is syntactically valid and contains no remote sending",()=>{
 new vm.Script(bridge);
 assert.ok(bridge.includes("navigator.clipboard.writeText"));
 assert.ok(bridge.includes('document.getElementById("input")'));
 assert.ok(bridge.includes('document.getElementById("output")'));
 assert.doesNotMatch(bridge, /postMessage\(|sendBeacon\(|XMLHttpRequest|localStorage|sessionStorage|indexedDB/);
 assert.match(bridge,/credentials:"same-origin"/);
 assert.match(bridge,/source\?\.gitBlobSha===PIN/);
});
test("Invalid CORE role denies profile verification; chat navigation remains available",async()=>{
 const label={textContent:""},button={addEventListener:()=>{}};
 const elements={pierreMentorStatus:label,pierreCopyContext:button};
 const root={navigator:{clipboard:{writeText:async()=>{throw Error("should not write")}}}};
 const context={window:root,document:{getElementById:id=>elements[id]||null},
  fetch:async()=>({ok:true,json:async()=>({...core,authority:{...core.authority,protectedRuntimeAccess:true}})}),
  Error,Object};
 vm.runInNewContext(bridge,context);
 const result=await root.PierreTranslatorMentor.verify();
 assert.equal(result,"unavailable");
 assert.equal(root.PierreTranslatorMentor.chatUrl,chat);
 assert.match(label.textContent,/no translator data/i);
});

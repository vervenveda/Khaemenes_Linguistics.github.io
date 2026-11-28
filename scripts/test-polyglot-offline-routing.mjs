import test from "node:test";import assert from "node:assert/strict";import fs from "node:fs";import vm from "node:vm";
const source=fs.readFileSync("service-worker.js","utf8");
const scope="https://example.test/Khaemenes_Linguistics.github.io/";
const handlers={};
const context=vm.createContext({URL,self:{registration:{scope},location:{origin:"https://example.test"},addEventListener:(name,fn)=>handlers[name]=fn}});
vm.runInContext(source,context);
const key=(path,mode="navigate")=>context.cacheKey({mode},new URL(path,scope));
test("public Hall handoffs reuse static shell without stripping the actual request URL",()=>{
 assert.equal(key("Halls/index.html?language=french&course=101&lang=fr"),scope+"Halls/index.html");
 assert.equal(key("Halls/?language=german"),scope+"Halls/index.html");
 assert.equal(key("apps/language-worlds/french/"),scope+"apps/language-worlds/french/index.html");
});
test("unknown or malformed navigation parameters fail closed",()=>{
 for(const path of ["Halls/index.html?token=secret","Halls/index.html?language=unknown","Halls/index.html?course=101","Halls/index.html?language=french&language=german","index.html?lang=unknown","apps/translator.html?from=en&to=fr"])assert.equal(key(path),null,path);
});
test("known static versioned assets resolve to the precache key",()=>{
 assert.equal(key("assets/vnv-language.js?v=20261126-header-slot","cors"),scope+"assets/vnv-language.js");
 assert.equal(key("assets/linguistics-landing.css?v=2","cors"),scope+"assets/linguistics-landing.css");
 assert.equal(key("assets/unknown.js?v=2","cors"),scope+"assets/unknown.js?v=2");
});
test("private vault and authorized requests are not intercepted",()=>{
 for(const [path,auth] of [["apps/vocabulary-mini-cloud/index.html",false],["index.html",true]]){
 let intercepted=false;handlers.fetch({request:{url:new URL(path,scope).href,method:"GET",mode:"navigate",headers:{has:()=>auth}},respondWith:()=>intercepted=true});assert.equal(intercepted,false);
 }
});
test("all public directories and landing CSS are precached",()=>{for(const p of ["apps/language-worlds/french/index.html","apps/language-worlds/german/index.html","apps/language-worlds/russian/index.html","apps/language-worlds/english-esl/index.html","apps/arabic-learning-worlds/index.html","assets/linguistics-landing.css","Halls/hall-i18n-pack.js"])assert.ok(source.includes("'./"+p+"'"),p)});

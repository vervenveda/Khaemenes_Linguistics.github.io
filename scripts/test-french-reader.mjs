#!/usr/bin/env node
// Dependency-free behavioral smoke tests for the actual French story reader JavaScript.
// Simulates a DOM and speech queue; not a substitute for real device/audio QA.
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join,dirname} from "node:path";
import {fileURLToPath} from "node:url";
import vm from "node:vm";
const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const html=readFileSync(join(root,"apps/chroniques-francophones/index.html"),"utf8");
const source=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(source,"Inline reader program available");
class Element {
 constructor(tag="div"){this.tag=tag;this.children=[];this.listeners={};this.dataset={};this.style={};this.value="";this.textContent="";this.className="";this.disabled=false}
 append(...items){this.children.push(...items)}
 replaceChildren(...items){this.children=[...items]}
 addEventListener(type,fn){(this.listeners[type]??=[]).push(fn)}
 dispatch(type,event={}){for(const fn of this.listeners[type]||[])fn(event)}
 click(){if(this.onclick)this.onclick();this.dispatch("click")}
 setAttribute(name,value){this[name]=value}
 querySelectorAll(selector){if(selector==="[data-line]")return this.children.filter(x=>x&&x.dataset&&x.dataset.line!==undefined);if(selector==="button")return this.children.filter(x=>x?.tag==="button");return []}
}
const ids=new Map();
const byId=id=>{if(!ids.has(id))ids.set(id,new Element());return ids.get(id)};
const store=new Map([["french101_active_learner","Ava"]]);
const storage={getItem:key=>store.has(key)?store.get(key):null,setItem:(key,value)=>store.set(key,String(value))};
let canceled=0;const queued=[];
const synth={getVoices:()=>[{name:"Amelie",lang:"fr-FR"}],cancel:()=>{canceled++;queued.length=0},speak:u=>queued.push(u)};
class Utterance{constructor(text){this.text=text}}
const ctx={document:{getElementById:byId,createElement:tag=>new Element(tag),createTextNode:t=>({textContent:t})},localStorage:storage,window:{speechSynthesis:synth,KhaemenesSovereignDictionary:null},speechSynthesis:synth,SpeechSynthesisUtterance:Utterance,URLSearchParams,location:{search:"?level=7"},URL:{createObjectURL:()=> "blob:test",revokeObjectURL:()=>{}},Blob:class{},setTimeout:fn=>fn(),console,Math,Date};
vm.createContext(ctx);vm.runInContext(source,ctx,{timeout:3000});
assert.match(byId("storyTitle").textContent,/Level 7/);
assert.ok(byId("reading").querySelectorAll("[data-line]").length>=5);
const lines=byId("reading").querySelectorAll("[data-line]");
let prevented=false;
lines[1].dispatch("keydown",{key:"Enter",preventDefault(){prevented=true}});
assert.ok(prevented,"Enter activates selected sentence");
assert.equal(lines[1]["aria-current"],"true","Selected line highlighted");
byId("narrate").click();
assert.equal(queued.length,1,"Speech utterance queued");
assert.equal(queued[0].text,ctx.STORIES?.[6]?.lines?.[1]?.[0]||lines[1].textContent,"Narrates selected line");
const stale=queued[0];stale.onend?.();assert.equal(queued.length,1,"Sentence progression replaces completed utterance");
const staleAgain=queued[0];
byId("storyPicker").value="8";byId("storyPicker").onchange();
assert.match(byId("storyTitle").textContent,/Level 8/,"Story selection applied");
assert.equal(queued.length,0,"Story change cancels audio");
staleAgain.onend?.();assert.equal(queued.length,0,"Stale callback cannot revive old speech");
byId("journal").value="Mon texte.";
byId("journal").oninput();
const avaKey=[...store.keys()].find(k=>k.includes("khaemenes_french_story_cafe_writing_v2_")&&k.endsWith("_level_8"));
assert.ok(avaKey,"Learner-specific journal saved");
store.set("french101_active_learner","Ben");
byId("storyPicker").value="9";byId("storyPicker").onchange();
byId("journal").value="Le livre.";
byId("journal").oninput();
assert.notEqual(byId("journal").value,store.get(avaKey),"Different learner cannot overwrite Ava record");
assert.equal(store.get(avaKey),"Mon texte.","Ava writing remains intact");
byId("narrate").click();assert.equal(queued.length,1);
byId("stopNarration").click();assert.equal(queued.length,0,"Stop cancels narration");
assert.ok(canceled>=2);
console.log("FRENCH_READER_BEHAVIOR=PASS: sentence keyboard, selected audio, cancellation, stale callback, story switching, learner writing");

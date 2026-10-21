import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const root=new URL("../",import.meta.url);
function mount(path,voices=[]){
 const html=readFileSync(new URL(path,root),"utf8");
 const js=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
 assert.ok(js,"Inline application exists");
 class El{
  constructor(){this.children=[];this.dataset={};this.value="0";this.textContent="";this.disabled=false;this.style={}}
  append(...items){this.children.push(...items)}
  replaceChildren(...items){this.children=[...items]}
  setAttribute(k,v){this[k]=v}
  querySelectorAll(q){return this.children.filter(x=>x.dataset.index!==undefined)}
  click(){this.onclick?.()}
 }
 const elements=new Map(),events={},memory=new Map();
 const document={getElementById(id){if(!elements.has(id))elements.set(id,new El());return elements.get(id)},createElement(){return new El()}};
 const localStorage={getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,String(v)),removeItem:k=>memory.delete(k)};
 const speechSynthesis={getVoices:()=>voices,cancel(){},speak(u){this.last=u}};
 const window={speechSynthesis,addEventListener:(event,handler)=>events[event]=handler,print(){this.printed=true}};
 const context={window,document,localStorage,speechSynthesis,SpeechSynthesisUtterance:class{constructor(text){this.text=text}},URL:{createObjectURL:()=>"#",revokeObjectURL(){}},URLSearchParams,location:{search:""},Blob:class{},setTimeout(){},Date,JSON,Math};
 vm.createContext(context);vm.runInContext(js,context,{timeout:5000});
 return {el:id=>document.getElementById(id),memory,events,window,speechSynthesis};
}
const world=mount("apps/die-lebendige-welt/index.html");
assert.equal(world.el("options").children.length,3);
world.el("options").children.find(x=>x.textContent.startsWith("Ich möchte Wasser")).click();
assert.equal(world.el("options").children.length,3);
world.el("options").children.find(x=>x.textContent.startsWith("Ja, ein Brot")).click();
assert.equal(JSON.parse(world.memory.get("khaemenes_german_world_v1_anonymous"))[0].correct,true);
world.el("printEvidence").click();assert.equal(world.window.printed,true);
world.memory.set("german_active_learner","Lena");world.events.storage({key:"german_active_learner"});
assert.equal(world.el("learner").value,"Lena");
const sound=mount("apps/deutsches-klanglabor/index.html");
sound.el("listen").click();
assert.ok(sound.el("answers").children.every(x=>!x.disabled),"No-voice text fallback");
sound.memory.set("german_active_learner","Lena");sound.events.storage({key:"german_active_learner"});
assert.equal(sound.el("learner").value,"Lena");
const audio=mount("apps/deutsches-klanglabor/index.html",[{lang:"de-DE"}]);
audio.el("listen").click();assert.ok(audio.speechSynthesis.last);
audio.speechSynthesis.last.onerror();assert.ok(audio.el("answers").children.every(x=>!x.disabled));
const reader=mount("apps/deutsche-geschichten/index.html");
assert.equal(reader.el("lines").children.length,5);
reader.memory.set("german_active_learner","Lena");reader.events.storage({key:"german_active_learner"});
assert.equal(reader.el("lines").children.length,5);
console.log("GERMAN_STUDIO_INTERACTIONS=PASS");

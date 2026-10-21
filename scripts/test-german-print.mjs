import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const source=readFileSync(new URL("../assets/german-portfolio-print.js",import.meta.url),"utf8");
for(const kind of ["story","sound","world","overview"]){
 const saved=new Map([["german_active_learner","Ava"]]);
 const id="61-76-61";
 saved.set("khaemenes_german_stories_v1_"+id+"_1_attempts",JSON.stringify([{},{}]));
 saved.set("khaemenes_german_sound_v1_"+id,JSON.stringify([{}]));
 saved.set("khaemenes_german_world_v1_"+id,JSON.stringify([{},{}]));
 class Element{
  constructor(tag){this.tag=tag;this.children=[];this.dataset={};this.listeners={};this.textContent="";this.className=""}
  append(...xs){this.children.push(...xs)}
  replaceChildren(...xs){this.children=[...xs]}
  setAttribute(){}
  addEventListener(k,fn){this.listeners[k]=fn}
 }
 const root=new Element("section");root.dataset.germanEvidence=kind;
 const body=new Element("body"),head=new Element("head"),events={};
 const document={querySelector:()=>root,createElement:t=>new Element(t),head,body};
 const window={addEventListener:(k,fn)=>events[k]=fn,print(){window.printed=true}};
 const context={document,window,localStorage:{getItem:k=>saved.get(k)??null},Date};
 vm.runInNewContext(source,context);
 assert.equal(root.children.length,2);
 root.children[0].listeners.click();
 const lines=root.children[1].children.map(x=>x.textContent).join("\n");
 assert.match(lines,/Khaemenes Academy/);
 assert.match(lines,/Student: Ava/);
 assert.match(lines,/Parent \/ teacher review/);
 assert.match(lines,/ungraded/);
 assert.equal(window.printed,true);
 assert.equal(body.dataset.germanPrinting,"true");
 if(kind==="overview")assert.match(lines,/Story attempts: 2 · Sound attempts: 1 · Conversation attempts: 2/);
 events.afterprint();
 assert.equal(body.dataset.germanPrinting,undefined);
}
assert.match(source,/data-german-evidence/);
assert.match(source,/main \[data-german-evidence\]/);
console.log("GERMAN_PORTFOLIO_PRINT=PASS: four activities, learner identity, evidence counts, review, print cleanup");

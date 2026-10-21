import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
function mount(path){
 const source=readFileSync(new URL("../"+path,import.meta.url),"utf8").match(/<script>([\s\S]*?)<\/script>/)[1];
 class El{
  constructor(){this.children=[];this.value="";this.textContent="";this.style={};this.classList={add:x=>this.classes.add(x),remove:x=>this.classes.delete(x)};this.classes=new Set();this.events={}}
  append(...x){this.children.push(...x)}
  replaceChildren(...x){this.children=[...x]}
  addEventListener(name,handler){this.events[name]=handler}
  click(){this.onclick?.();this.events.click?.()}
 }
 const els=new Map(),store=new Map(),events={};
 const document={getElementById(id){if(!els.has(id))els.set(id,new El());return els.get(id)},createElement(){return new El()},body:new El()};
 const window={addEventListener:(k,fn)=>events[k]=fn,print(){window.printed=true}};
 const localStorage={getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v))};
 const ctx={document,window,localStorage,Date,JSON,Math,Blob:class{},URL:{createObjectURL:()=>"#",revokeObjectURL(){}},setTimeout(){}};
 vm.createContext(ctx);vm.runInContext(source,ctx,{timeout:1500});
 return{el:id=>document.getElementById(id),store,events,document,window};
}
const de=mount("apps/german-mastery-constellation/index.html");
de.el("parentNotes").value="German observation";
de.el("saveParentNotes").click();
de.el("portfolioReport").click();
assert.ok(de.window.printed);
assert.match(de.el("unifiedPortfolio").children.map(x=>x.textContent).join(" "),/German observation/);
assert.equal(de.el("unifiedPortfolio").children.filter(x=>/^Story [0-9]/.test(x.textContent)).length,12);
de.events.afterprint();assert.ok(!de.document.body.classes.has("printing-unified-german"));
de.el("learnerName").value="Ben";de.el("viewLearner").click();
assert.equal(de.el("parentNotes").value,"");
const fr=mount("apps/maitrise-constellation/index.html");
fr.el("learner").value="Ava";fr.el("load").click();
fr.el("parentNotes").value="French observation";fr.el("saveParentNotes").click();
fr.el("printPortfolio").click();
assert.ok(fr.window.printed);
const lines=fr.el("unifiedPortfolio").children.map(x=>x.textContent);
assert.ok(lines.some(x=>x.includes("French observation")));
assert.equal(lines.filter(x=>/^Level [0-9]+ ·/.test(x)).length,24);
fr.events.afterprint();assert.ok(!fr.document.body.classes.has("printing-french-unified"));
fr.el("learner").value="Ben";fr.el("load").click();
assert.equal(fr.el("parentNotes").value,"");
console.log("BILINGUAL_PORTFOLIOS=PASS: print, per-learner notes, detailed evidence, print cleanup");

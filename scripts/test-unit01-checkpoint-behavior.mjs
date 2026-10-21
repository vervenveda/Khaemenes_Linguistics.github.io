import assert from "node:assert/strict";
import vm from "node:vm";
import {readFileSync} from "node:fs";
const root=new URL("../",import.meta.url);
const app=readFileSync(new URL("assets/unit01-language-checkpoint.js",root),"utf8");
function simulate(language){
 const html=readFileSync(new URL("apps/language-worlds/"+language+"/unit-01-checkpoint.html",root),"utf8");
 const bank=JSON.parse(html.match(/const QUESTIONS=(\[[\s\S]*?\]);const voiceCode=/)[1]);
 const storage=new Map();
 const els=new Map(),watch={},selectedAnswers={};
 function element(id){if(!els.has(id))els.set(id,{value:"",textContent:"",disabled:false,files:[],children:[],events:{},onclick:null,onchange:null,append(...x){this.children.push(...x)},replaceChildren(...x){this.children=x},addEventListener(t,fn){(this.events[t]??=[]).push(fn)},reset(){Object.keys(selectedAnswers).forEach(k=>delete selectedAnswers[k])},click(){if(this.onclick)this.onclick()}});return els.get(id)}
 const document={body:{dataset:{language}},getElementById:element,createElement:()=>element("temp"+(++document.counter)),createTextNode:t=>({textContent:t}),querySelector:q=>{const m=q.match(/q(\d+)/);return m&&selectedAnswers[m[1]]!==undefined?{value:selectedAnswers[m[1]]}:null},counter:0};
 let confirms=0,prints=0;
 const localStorage={getItem:k=>storage.get(k)??null,setItem(k,v){storage.set(k,String(v))},removeItem:k=>storage.delete(k)};
 const context={document,localStorage,QUESTIONS:bank,Date,Number,Object,Array,JSON,window:{confirm(){confirms++;return true},print(){prints++},addEventListener(t,fn){watch[t]=fn}},URL:{createObjectURL(){return"blob:mock"},revokeObjectURL(){}},Blob:class{},setTimeout(){}};
 vm.createContext(context);vm.runInContext(app,context);
 const trigger=(id,t)=>{for(const fn of element(id).events[t]||[])fn()};
 function learner(n){element("learner").value=n;element("select").onclick()}
 function score(n){for(let i=0;i<10;i++)selectedAnswers[i]=i<n?bank[i][2]:(bank[i][2]+1)%3;element("grade").onclick()}
 const record=()=>JSON.parse(storage.get("khae_unit01_checkpoint_v1_"+language+"_"+Array.from(element("learner").value.toLowerCase(),c=>c.codePointAt(0).toString(16)).join("-")));
 learner("Alice");score(6);assert.equal(record().attempts[0].score,6,language+" first attempt");
 element("retry").onclick();score(9);assert.deepEqual(record().attempts.map(a=>a.score),[6,9]);
 element("grammar").value="Three independently constructed sentences";trigger("grammar","change");
 element("conversation").value="Six original turns";trigger("conversation","change");
 element("listening").value="Location, time, reason, and invitation";trigger("listening","change");
 element("reviewer").value="Parent / teacher";trigger("reviewer","change");
 element("notes").value="Review of independent work";trigger("notes","change");
 for(const k of ["knowledge","grammar","conversation","listening","performance"]){element("score-"+k).value="4";trigger("score-"+k,"change")}
 assert.match(element("status").textContent,/Teacher-reviewed checkpoint readiness recorded/);
 const alice=JSON.stringify(record());
 learner("Bob");assert.match(element("status").textContent,/No recorded knowledge/);
 score(3);assert.equal(record().attempts[0].score,3);
 learner("Alice");assert.deepEqual(record().attempts.map(a=>a.score),[6,9]);assert.equal(element("conversation").value,"Six original turns");
 element("print").onclick();assert.equal(prints,1);
 const checkpoint=JSON.parse(alice),bad={format:"khae-unit01-checkpoint-v1",language,learner:"bob",record:checkpoint};
 return {language,aliceAttempts:checkpoint.attempts.length,bobIndependent:true,print:prints};
}
for(const lang of ["spanish","mandarin","japanese"])console.log(simulate(lang));
console.log("UNIT01_CHECKPOINT_BEHAVIOR=PASS");
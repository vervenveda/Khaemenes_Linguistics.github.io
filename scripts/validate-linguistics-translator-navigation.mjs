import fs from "node:fs";
import path from "node:path";
const root=process.cwd(),errors=[];
for(const course of ["arabic-1","russian-1"])for(let n=1;n<=32;n++){
 const week=String(n).padStart(2,"0"),p=path.join(root,"Halls/courses",course,"week-"+week,"index.html"),s=fs.readFileSync(p,"utf8");
 if(!s.includes("data-year-i-week-navigation"))errors.push(course+" "+week+" missing navigation");
 if(!s.includes('src="../../../../assets/year-i-evidence-journal.js"'))errors.push(course+" "+week+" missing evidence journal");
 if(!s.includes('src="../../../../assets/year-i-teacher-review.js"'))errors.push(course+" "+week+" missing teacher-review companion");
 if(!s.includes('href="../../index.html"'))errors.push(course+" "+week+" missing index");
 if(n>1&&!s.includes('href="../week-'+String(n-1).padStart(2,"0")+'/index.html"'))errors.push(course+" "+week+" missing previous");
 if(n<32&&!s.includes('href="../week-'+String(n+1).padStart(2,"0")+'/index.html"'))errors.push(course+" "+week+" missing next");
}
const journal=fs.readFileSync(path.join(root,"assets/year-i-evidence-journal.js"),"utf8");
for(const token of ["reading","writing","listening","speaking","localStorage.setItem","Export JSON","does not grade quizzes"])if(!journal.includes(token))errors.push("journal contract missing "+token);
const review=fs.readFileSync(path.join(root,"assets/year-i-teacher-review.js"),"utf8");
for(const v of ["arabic-1","russian-1","verified:false","reviewComplete","Reading","Writing","Listening","Speaking"])if(!review.includes(v))errors.push("review contract missing "+v);
const engine=fs.readFileSync(path.join(root,"assets/vnv-language.js"),"utf8");
for(const guard of ['form,[lang]:not([lang="en"])','[data-private]','[data-student]','[data-learner]'])if(!engine.includes(guard))errors.push("missing academic translation exclusion "+guard);
if(errors.length){console.error(errors.slice(0,25).join("\n"));process.exitCode=1;}else console.log("PASS: 64 learner routes and language-learner privacy translation exclusions.");

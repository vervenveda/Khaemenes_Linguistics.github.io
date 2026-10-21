import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const base=process.cwd();
for(const course of ["arabic-1","russian-1"]){
 const file=path.join(base,"Halls/courses",course,"index.html");
 const html=fs.readFileSync(file,"utf8");
 const expected="academic-evidence-companion.html?course="+course;
 assert(html.includes(expected),course+": missing Academy companion link");
 assert(html.includes("Connected Academy evidence"),course+": missing evidence description");
 const dictionary=path.resolve(path.dirname(file),"../../../apps/dictionarybox_index.html");
 assert(fs.existsSync(dictionary),course+": dictionary route missing");
 assert(html.includes('href="../../../apps/dictionarybox_index.html"'),course+": dictionary href not linked");
}
console.log("PASS Arabic I and Russian I: shared evidence companion context and sovereign dictionary routes");

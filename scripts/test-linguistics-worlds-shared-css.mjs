import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const paths=["apps/language-worlds/spanish/index.html","apps/language-worlds/mandarin/index.html","apps/language-worlds/japanese/index.html","apps/language-worlds/english-esl/index.html","apps/arabic-learning-worlds/index.html"];
for(const path of paths)test(path+" has one stylesheet and canonical chrome",()=>{
 const html=fs.readFileSync(path,"utf8");
 assert.equal((html.match(/href="[^"]*assets\/linguistics-landing\.css"/g)||[]).length,1);
 assert.doesNotMatch(html,/<style\b|linguistics-global-standard-v1\.js|vnv-ecosystem-menu\.js|khaemenes-global-header\.js/);
 for(const file of ["vnv-333-ticker.js","vnv-ticker-autopopulate.js","vnv-header-autopopulate.js","vnv-ecosystem-toolbar.js","vnv-language.js"]){
  const tags=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].filter(x=>x[1].includes(file));assert.equal(tags.length,1,file);
 }
 assert.match(html,/class="linguistics-hero"/);assert.match(html,/aria-label="Breadcrumb"/);
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const paths=["apps/language-worlds/spanish/index.html","apps/language-worlds/mandarin/index.html","apps/language-worlds/japanese/index.html","apps/language-worlds/english-esl/index.html","apps/arabic-learning-worlds/index.html","apps/language-worlds/french/index.html","apps/language-worlds/german/index.html","apps/language-worlds/russian/index.html"];
for(const path of paths)test(path+" has one stylesheet and canonical chrome",()=>{
 const html=fs.readFileSync(path,"utf8");
 assert.equal((html.match(/href="[^"]*assets\/linguistics-landing\.css"/g)||[]).length,1);
 assert.doesNotMatch(html,/<style\b|linguistics-global-standard-v1\.js|vnv-ecosystem-menu\.js|khaemenes-global-header\.js/);
 for(const file of ["vnv-333-ticker.js","vnv-ticker-autopopulate.js","vnv-header-autopopulate.js","vnv-ecosystem-toolbar.js","vnv-language.js"]){
  const tags=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].filter(x=>x[1].includes(file));assert.equal(tags.length,1,file);
 }
 assert.match(html,/class="linguistics-hero"/);assert.match(html,/aria-label="Breadcrumb"/);
});

import path from "node:path";
for(const file of ["apps/language-worlds/french/index.html","apps/language-worlds/german/index.html","apps/language-worlds/russian/index.html"])test(file+" retains existing application routes",()=>{
 const html=fs.readFileSync(file,"utf8");
 for(const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)){
  const href=match[1];if(/^(https?:|#|mailto:)/.test(href))continue;
  const target=path.resolve(path.dirname(file),href.split(/[?#]/)[0]);assert.ok(fs.existsSync(target),target);
 }
});

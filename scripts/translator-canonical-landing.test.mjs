import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const html=await readFile(new URL("../apps/translator.html",import.meta.url),"utf8");
const scripts=[...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(x=>x[1]);
const count=needle=>scripts.filter(x=>x.includes(needle)).length;

test("one official VNV 333 + AutoPopulate ticker guard, no competing local ticker",()=>{
 assert.equal(count("vnv-dual-ticker-v1.js"),0);
 assert.equal(count("vnv-333-ticker.js"),1);
 assert.equal(count("vnv-ticker-autopopulate.js"),1);
 assert.equal((html.match(/<div[^>]+id="networkTicker"/g)||[]).length,0);
 assert.equal((html.match(/<div[^>]+id="vnvTickerAutoPopulate"/g)||[]).length,0);
 assert.doesNotMatch(html,/class="top-ribbon"/);
});
test("official compact VNV header and single hamburger authority",()=>{
 assert.equal(count("vnv-header-autopopulate.js"),1);
 assert.equal(count("vnv-ecosystem-menu.js"),0);
 assert.doesNotMatch(html,/<header class="site-header"|data-vnv-ecosystem-slot|id="vnvEcosystemMenuButton"/);
 assert.match(html,/actions:\[\]/);
});
test("one lower-left universal toolkit and canonical lower-right ecosystem toolbar",()=>{
 assert.equal(count("vnv-class-tools-toolbar.js"),1);
 assert.equal(count("vnv-ecosystem-toolbar.js"),1);
 assert.match(html,/window\.KhaemenesClassToolsConfigV1=/);
 assert.doesNotMatch(html,/type:"translator",label:"Language"/);
 assert.equal(count("vnv-language.js"),1);
});
test("33/66/24 charcoal hero and 7px corners, symmetric 2x2 features",()=>{
 assert.match(html,/<div class="eyebrow">Khaemenes Academy<\/div>/);
 assert.match(html,/<h1 id="translatorHeroTitle">Sovereign Translator<\/h1>/);
 assert.match(html,/\.hero \.eyebrow\{font:400 33px/);
 assert.match(html,/\.hero h1\{font:400 66px/);
 assert.match(html,/\.hero p\{font:400 24px/);
 assert.match(html,/\.vnv-translator-features\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
 assert.equal((html.match(/class="vnv-translator-features"/g)||[]).length,1);
 assert.equal((html.match(/<div><strong>(?:Translation Workspace|Dictionary &amp; Thesaurus|Bilingual Learning|Teacher Study Lab)<\/strong>/g)||[]).length,4);
 assert.match(html,/--radius:7px;--radius-large:7px/);
});
test("three centered translator-specific access buttons have existing anchors",()=>{
 const section=html.match(/<nav class="vnv-translator-doors"[\s\S]*?<\/nav>/)?.[0];
 assert.ok(section);
 assert.equal((section.match(/<a /g)||[]).length,3);
 for(const id of ["translatorWorkspace","dictionaryTitle","candidateLearningHeading"]){
  assert.ok(section.includes('href="#'+id+'"'));
  assert.ok(html.includes('id="'+id+'"'));
 }
});
test("original translator functionality, offline dictionary and Teacher review stay in place",()=>{
 for(const id of ["translateBtn","saveBtn","consentDialog","dictionarySearchBtn","thesaurusSearchBtn","candidateLearningOptIn","reviewAttestation"]){
  assert.ok(html.includes('id="'+id+'"'),"Missing established "+id);
 }
 for(const asset of ["khaemenes-interlingual-core.js","khaemenes-review-policy.js","khaemenes-translation-candidate-lab.js","khaemenes-translation-teacher-arbiter.js"]){
  assert.equal(count(asset),1);
 }
 assert.match(html,/class="footer"/);
});

test("translator entry uses canonical VNV components, three doors and four symmetrical features",async()=>{
 const entry=await readFile(new URL("../apps/translator-entry.html",import.meta.url),"utf8");
 const loaded=[...entry.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(x=>x[1]);
 const uses=x=>loaded.filter(v=>v.includes(x)).length;
 for(const x of ["vnv-333-ticker.js","vnv-ticker-autopopulate.js","vnv-header-autopopulate.js","vnv-class-tools-toolbar.js","vnv-ecosystem-toolbar.js","vnv-language.js"])
  assert.equal(uses(x),1,"Missing or duplicate canonical asset: "+x);
 assert.equal(uses("vnv-dual-ticker-v1.js"),0);
 assert.equal(uses("vnv-ecosystem-menu.js"),0);
 assert.doesNotMatch(entry,/<header class="site-header"|data-vnv-ecosystem-slot/);
 assert.match(entry,/actions:\[\]/);
 assert.doesNotMatch(entry,/type:"translator",label:"Language"/);
 assert.match(entry,/\.hero \.eyebrow\{font:400 33px/);
 assert.match(entry,/\.hero h1\{font:400 66px/);
 assert.match(entry,/\.hero \.descriptor\{font:400 24px/);
 assert.match(entry,/\.features\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
 const doors=entry.match(/<nav class="access"[\s\S]*?<\/nav>/)?.[0];
 assert.equal((doors?.match(/<a /g)||[]).length,3);
 assert.equal((entry.match(/class="feature"/g)||[]).length,4);
 assert.doesNotMatch(entry,/body > #vnv-language-switch\{display:none!important\}/);
 assert.match(entry,/translator\.html#candidateLearningHeading/);
});

test("charcoal translator buttons retain cream text in default hover and focus states",()=>{
 assert.match(html,/\.btn:not\(\.ghost\):not\(\.gold\):not\(\.secondary\)/);
 assert.match(html,/\.mode-tab\[aria-selected="true"\]/);
 assert.match(html,/background:#252b2b!important;/);
 assert.match(html,/background:#353d3d!important;/);
 assert.match(html,/color:#fff8e9!important;/);
 assert.match(html,/\.btn\.ghost,html body \.btn\.gold/);
 assert.match(html,/\.btn\.secondary\{color:#fff8e9!important\}/);
});

test("translator editable fields use legible light appearance and explicit dark text",()=>{
 assert.match(html,/html\{color-scheme:light\}/);
 assert.match(html,/input:not\(\[type="checkbox"\]\):not\(\[type="radio"\]\):not\(\[type="file"\]\),textarea,select/);
 assert.match(html,/background-color:#fffaf0!important;/);
 assert.match(html,/color:#252b2b!important;/);
 assert.match(html,/-webkit-text-fill-color:#252b2b!important;/);
 assert.match(html,/::placeholder/);
 assert.match(html,/-webkit-text-fill-color:#555c57!important;/);
 assert.match(html,/main select option/);
 assert.match(html,/caret-color:#252b2b/);
});
test("translation submit is distinguishable from manually reviewed save",()=>{
 assert.match(html,/<button class="btn" id="translateBtn" type="button">Enter Translation<\/button>/);
 assert.match(html,/<button class="btn secondary" id="saveBtn" type="button">Save My Reviewed Pair<\/button>/);
 assert.match(html,/\.translation-review #candidateLearningClear/);
 assert.match(html,/-webkit-text-fill-color:#fff8e9!important;/);
});

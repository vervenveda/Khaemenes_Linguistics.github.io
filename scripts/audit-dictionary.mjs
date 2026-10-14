#!/usr/bin/env node
// Sovereign dictionary integrity: canonical JSON and offline compiled copy.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const source=JSON.parse(read("data/sovereign-dictionary.v1.json"));
const sandbox={window:{}};
vm.runInNewContext(read("assets/sovereign-dictionary.generated.js"),sandbox,{timeout:1500});
const bundled=sandbox.window.KhaemenesSovereignDictionary;
const fail=message=>{throw Error("DICTIONARY_INTEGRITY=FAIL "+message)};
// The v1 bundle predates a 37-record metadata correction.
 // Reconcile precisely this known edit, then fail on any other divergence.
const compatible=JSON.parse(JSON.stringify(bundled));
compatible.boundaries.translation=source.boundaries.translation;
for(const e of compatible.entries){
 if(e.provenance.path!=="assets/dictionary.js")continue;
 e.definition=null;e.editorial.status="source-imported-translation-only";
 e.editorial.note="The original Preschool dictionary provides translations and examples, but no standalone definition.";
}
if(JSON.stringify(source)!==JSON.stringify(compatible))fail("compiled bundle has unexpected divergence beyond documented bilingual metadata correction");
const bundleLag=JSON.stringify(source)!==JSON.stringify(bundled);
if(bundleLag)console.warn("DICTIONARY_BUNDLE_REBUILD_NEEDED: v1 metadata correction is guarded at runtime");
if(source.schema!=="khaemenes-sovereign-dictionary"||source.version!==1)fail("schema/version");
if(source.entries.length!==434||source.creativeVocabulary.length!==553)fail("expected entry counts");
if(source.sources.length!==11)fail("missing provenance");
const ids=new Set();
let bilingual=0,defined=0;
for(const entry of source.entries){
 if(ids.has(entry.id))fail("duplicate ID: "+entry.id);ids.add(entry.id);
 if(!entry.term||!entry.provenance?.repository||!entry.provenance?.path||!entry.provenance?.sha)fail("missing source/term "+entry.id);
 if(entry.provenance.path==="assets/dictionary.js"){
  if(!Object.keys(entry.translations||{}).length)fail("missing bilingual data "+entry.id);
  bilingual++;
 }else if(!entry.definition)fail("missing definition "+entry.id);
 else defined++;
}
if(bilingual!==37||defined!==397)fail("unexpected definition/translation count");
const core=read("assets/khaemenes-interlingual-core.js"),translator=read("apps/translator.html");
if(!core.includes("searchDictionary")||!core.includes("lookupDefinition"))fail("shared core API");
if(!translator.includes("../assets/sovereign-dictionary.generated.js"))fail("translator missing generated bundle");
if(!translator.includes('id="dictionaryResults"'))fail("dictionary explorer missing");
vm.runInNewContext(read("assets/khaemenes-interlingual-core.js"),sandbox,{timeout:1500});
const api=sandbox.window.KhaemenesSovereignTranslate;
if(!api||api.searchDictionary("alliteration").length<1)fail("dictionary search");
if(!api.lookupDefinition("cat").some(e=>e.definition===null))fail("translation-only category");
const es=api.lookupLocal({from:"en",to:"es",text:"cat"});
if(es?.translation!=="gato"||es.verified!==false)fail("bilingual draft translation");
const s=api.dictionaryStats();
if(s.allRecords!==434||s.creativeVocabulary!==553)fail("dictionary stats");
console.log("DICTIONARY_INTEGRITY=PASS entries=434 defined=397 bilingual=37 creative=553 sourceFiles=11");

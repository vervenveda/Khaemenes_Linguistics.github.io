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
vm.runInNewContext(read("assets/sovereign-dictionary-v1-errata.js"),sandbox,{timeout:1500});
if(JSON.stringify(source)!==JSON.stringify(bundled))fail("effective browser bundle differs from canonical JSON");
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
const links=api.thesaurusStats();
if(links.sourceListedLinks!==234||links.entriesWithRelatedTerms!==221||links.automaticInferences!==0)fail("thesaurus link inventory");
const zeugma=api.lookupThesaurus("zeugma");
if(!zeugma.related.some(x=>x.direct&&x.sourceRecords.some(r=>r.source?.repository==="vervenveda/arcade.github.io")))fail("thesaurus source path");
const reverse=api.lookupThesaurus("double-duty construction");
if(!reverse.related.some(x=>x.term.toLowerCase()==="zeugma"&&x.reverse))fail("reverse thesaurus source");
if(api.lookupThesaurus("unlisted-gibberish").related.length)fail("no invented thesaurus relationships");
const fr=api.lookupLocal({from:"fr",to:"en",text:"chat"});
if(fr?.translation!=="cat"||fr.verified!==false)fail("reverse French vocabulary");
if(api.lookupLocal({from:"fr",to:"es",text:"chat"})!==null)fail("unreviewed non-English pivot");

const es=api.lookupLocal({from:"en",to:"es",text:"cat"});
if(es?.translation!=="gato"||es.verified!==false)fail("bilingual draft translation");
const s=api.dictionaryStats();
if(s.allRecords!==434||s.creativeVocabulary!==553)fail("dictionary stats");
console.log("DICTIONARY_INTEGRITY=PASS entries=434 defined=397 bilingual=37 creative=553 related=234 offline=PASS");

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

const store=new Map();
sandbox.window.localStorage={
 getItem:key=>store.has(key)?store.get(key):null,
 setItem:(key,value)=>{store.set(key,String(value))},
 removeItem:key=>{store.delete(key)}
};
const saved=api.saveLocalEntry({term:"auroral",definition:"Related to an aurora.",synonyms:["luminous","polar"],example:"An auroral glow appeared."});
if(!saved.ok||api.listLocalEntries().length!==1)fail("new local draft save");
if(!api.searchDictionary("auroral").some(e=>e.editorial?.status==="local-draft"))fail("draft included in dictionary search");
if(!api.searchDictionary("glow appeared").some(e=>e.term==="auroral"))fail("example sentence discovery");
if(!api.searchDictionary("auroral").some(e=>e.example==="An auroral glow appeared."))fail("example source preserved");
if(!api.searchDictionary("Related to an aurora.").some(e=>e.term==="auroral"))fail("definition discovery preserved");
if(api.searchDictionary("definitely-not-a-record-xyz").length!==0)fail("no fabricated search results");
const connections=api.lookupThesaurus("auroral");
if(!connections.related.some(x=>x.term==="luminous"))fail("draft synonym relation");
const portable=api.exportLocalEntries();
if(portable.schema!=="khaemenes-dictionary-drafts"||portable.entries.length!==1)fail("portable draft JSON");
if(!api.removeLocalEntry(saved.id)||api.listLocalEntries().length)fail("delete local draft");
const imported=api.importLocalEntries(portable);
if(!imported.ok||imported.added!==1||api.listLocalEntries().length!==1)fail("import local draft");
if(api.importLocalEntries({schema:"not-ours",version:1,entries:[]}).ok)fail("reject unrelated imports");
if(!translator.includes('id="bilingualReadingStudio"')||!translator.includes('id="readingRefresh"'))fail("bilingual reading studio missing");
if(!translator.includes("lookupOffline(from,to,line)"))fail("bilingual reader must use existing offline library");
if(!translator.includes("No exact offline translation available for this line."))fail("reading missing-match notice");
if(!translator.includes("target.replaceChildren()"))fail("reader must clear prior passage display");
if(!translator.includes('id="lexiconDraftForm"')||!translator.includes('id="thesaurusResults"'))fail("thesaurus/draft UI missing");
if(!translator.includes("els.reviewText.dir=t.dir; els.reviewText.lang=t.code;"))fail("translation review editor target language / RTL direction");
if(!translator.includes('id="status" class="status" role="status" aria-live="polite" aria-atomic="true" lang="en" dir="ltr"'))fail("accessible English status announcements");
if(!translator.includes('els.output.lang="en";els.output.dir="ltr";'))fail("offline fallback direction metadata");
if(!translator.includes("../assets/sovereign-dictionary-v1-errata.js"))fail("canonical dictionary errata not loaded");
console.log("DICTIONARY_DRAFTS=PASS: add, search, related, export, delete, import, reject incompatible");
console.log("DICTIONARY_INTEGRITY=PASS entries=434 defined=397 bilingual=37 creative=553 related=234 offline=PASS");

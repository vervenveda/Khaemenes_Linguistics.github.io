#!/usr/bin/env node
/* Rebuild/verify the offline Sovereign Dictionary from its canonical source.
 * No network, runtime dependencies, or writes unless explicit --write.
 */
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const sourcePath=path.join(root,"data/sovereign-dictionary.v1.json");
const outputPath=path.join(root,"assets/sovereign-dictionary.generated.js");
const source=JSON.parse(fs.readFileSync(sourcePath,"utf8"));
if(source.schema!=="khaemenes-sovereign-dictionary"||source.version!==1||source.entries?.length!==434||
 source.creativeVocabulary?.length!==553||source.entries.filter(e=>e.provenance?.path==="assets/dictionary.js").length!==37)
 throw Error("Unexpected canonical dictionary source: refusing distribution build");
const output=`/* Generated derivative of data/sovereign-dictionary.v1.json — do not edit independently.
 * Deterministic, static, offline, no network; regenerate with scripts/build-sovereign-dictionary.mjs.
 */
(function(root){"use strict";
const data=${JSON.stringify(source)};
root.KhaemenesSovereignDictionary=Object.freeze(data);
})(window);
`;
if(process.argv.includes("--write")){
 fs.writeFileSync(outputPath,output,"utf8");
 console.log("SOVEREIGN_DICTIONARY_BUNDLE=WRITTEN");
}else{
 const current=fs.readFileSync(outputPath,"utf8");
 if(current!==output)throw Error("SOVEREIGN_DICTIONARY_BUNDLE=DRIFT — run --write only after source review");
 console.log("SOVEREIGN_DICTIONARY_BUNDLE=PASS exact deterministic match");
}

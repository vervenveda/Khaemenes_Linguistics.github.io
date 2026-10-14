/* Overlay for v1 generated bundle: makes the current browser data match
 * data/sovereign-dictionary.v1.json without changing its original source files.
 * Remove only after regenerating the large compiled asset from the canonical JSON.
 * No network calls or personal information.
 */
(function(root){"use strict";
const data=root.KhaemenesSovereignDictionary;
if(!data||!Array.isArray(data.entries))return;
data.boundaries.translation="Only source-provided bilingual word pairs can be offered as draft offline translations. Reviewed browser-local pairs outrank them. Source definitions are not machine translations.";
for(const entry of data.entries){
 if(entry.provenance?.path!=="assets/dictionary.js")continue;
 entry.definition=null;
 if(entry.editorial){
  entry.editorial.status="source-imported-translation-only";
  entry.editorial.note="The original Preschool dictionary provides translations and examples, but no standalone definition.";
 }
}
})(window);

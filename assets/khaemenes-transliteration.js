/* Script transliteration aid v1 — letter-level Latin approximation, NOT pronunciation or verified translation. */
(function(root){"use strict";
const ru={"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"yo","ж":"zh","з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"kh","ц":"ts","ч":"ch","ш":"sh","щ":"shch","ъ":"ʺ","ы":"y","ь":"ʹ","э":"e","ю":"yu","я":"ya"};
const ar={"ا":"a","أ":"ʾa","إ":"ʾi","آ":"ā","ء":"ʾ","ب":"b","ت":"t","ث":"th","ج":"j","ح":"ḥ","خ":"kh","د":"d","ذ":"dh","ر":"r","ز":"z","س":"s","ش":"sh","ص":"ṣ","ض":"ḍ","ط":"ṭ","ظ":"ẓ","ع":"ʿ","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","ة":"a(h)","و":"w","ي":"y","ى":"ā","َ":"a","ِ":"i","ُ":"u","ْ":"","ّ":"","ً":"an","ٍ":"in","ٌ":"un","ـ":""};
function transliterate(text,lang){
 if(typeof text!=="string"||text.length>2000)return {text:"",status:"unsupported"};
 const map=lang==="ru"?ru:lang==="ar"?ar:null;
 if(!map)return {text:"",status:"unsupported-language"};
 const out=Array.from(text.normalize("NFC"),ch=>{
   const l=ch.toLowerCase();let v=map[l];return v===undefined?ch:ch!==l?v.charAt(0).toUpperCase()+v.slice(1):v;
 }).join("");
 return {text:out,status:"approximate-letter-transliteration",note:"Not phonetic transcription. Arabic without vowel marks cannot be fully vocalized; Russian stress is not inferred."};
}
root.KhaemenesTransliteration=Object.freeze({transliterate,supportedLanguages:["ar","ru"]});
})(window);

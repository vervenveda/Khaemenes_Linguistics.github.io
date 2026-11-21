/* Khaemenes Linguistics · Encrypted Vocabulary Mini Cloud candidate v0.1
 * STOS commissioning HOLD: never substitute browser persistence or GitHub commits.
 * Sensitive records are encrypted BEFORE crossing the injected storage bridge.
 * No localStorage, IndexedDB, cookies, sessionStorage, filesystem, or fallback.
 */
(()=>{"use strict";
const NS="linguistics.vocabulary.v1",MAX=4000,MAX_WORD=120,MAX_TRANSLATION=500,ITER=310000;
const enc=new TextEncoder(),dec=new TextDecoder(),$=id=>document.getElementById(id);
let records=[],revision=null,identity=null,passphrase="",busy=false,connected=false;
function note(message,alert=false){const node=$("vaultStatus");node.textContent=message;node.dataset.alert=String(alert)}
function b64(bytes){let s="";for(const v of bytes)s+=String.fromCharCode(v);return btoa(s)}
function un64(value){return Uint8Array.from(atob(value),c=>c.charCodeAt(0))}
function random(n){const b=new Uint8Array(n);crypto.getRandomValues(b);return b}
async function derive(pass,salt){const material=await crypto.subtle.importKey("raw",enc.encode(pass),"PBKDF2",false,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:ITER,hash:"SHA-256"},material,{name:"AES-GCM",length:256},false,["encrypt","decrypt"])}
async function encrypt(value,pass){const salt=random(16),iv=random(12),key=await derive(pass,salt);const bytes=enc.encode(JSON.stringify(value));if(bytes.byteLength>750000)throw Error("Vocabulary record exceeds size limit");const cipher=await crypto.subtle.encrypt({name:"AES-GCM",iv,additionalData:enc.encode(NS)},key,bytes);return {schema:"khaemenes-linguistics-vocabulary-vault",version:1,algorithm:"AES-256-GCM",kdf:"PBKDF2-HMAC-SHA256",iterations:ITER,salt:b64(salt),iv:b64(iv),ciphertext:b64(new Uint8Array(cipher))}}
async function decrypt(blob,pass){if(!blob)return {schema:NS,version:1,entries:[]};if(blob.schema!=="khaemenes-linguistics-vocabulary-vault"||blob.version!==1||blob.algorithm!=="AES-256-GCM"||blob.kdf!=="PBKDF2-HMAC-SHA256"||blob.iterations!==ITER)throw Error("Unrecognized encrypted vault envelope");const key=await derive(pass,un64(blob.salt));const plaintext=await crypto.subtle.decrypt({name:"AES-GCM",iv:un64(blob.iv),additionalData:enc.encode(NS)},key,un64(blob.ciphertext));const data=JSON.parse(dec.decode(plaintext));if(data.schema!==NS||data.version!==1||!Array.isArray(data.entries)||data.entries.length>MAX)throw Error("Invalid decrypted vocabulary record");return data}
async function sha(envelope){const digest=await crypto.subtle.digest("SHA-256",enc.encode(JSON.stringify(envelope)));return [...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,"0")).join("")}
function bridge(){return window.KhaemenesVocabularySTOSBridge??null}
async function readyBridge(){
 const b=bridge();
 if(!b||typeof b.status!=="function"||typeof b.get!=="function"||typeof b.put!=="function")throw Error("STOS vocabulary bridge not commissioned; encrypted saves are disabled.");
 const status=await b.status({namespace:NS});
 if(status?.authenticated!==true||status?.durable!==true||status?.offController!==true||typeof status?.identity!=="string"||!status.identity.trim()||status?.namespace!==NS)throw Error("STOS authorization or durable off-controller storage is unavailable.");
 return {b,status};
}
function sanitize(text,max){return String(text??"").trim().slice(0,max)}
function valid(data){return data.every(e=>e&&typeof e==="object"&&typeof e.word==="string"&&e.word.length>0&&e.word.length<=MAX_WORD&&typeof e.translation==="string"&&e.translation.length>0&&e.translation.length<=MAX_TRANSLATION&&/^[a-z]{2,8}(?:-[A-Za-z0-9]{2,8})?$/.test(e.sourceLanguage)&&/^[a-z]{2,8}(?:-[A-Za-z0-9]{2,8})?$/.test(e.targetLanguage))}
function render(){const list=$("vocabularyList");list.replaceChildren();$("wordCount").textContent=records.length+" retained vocabulary pairs";for(const item of records.slice().reverse().slice(0,100)){const li=document.createElement("li"),strong=document.createElement("strong"),small=document.createElement("span");strong.textContent=item.word+" → "+item.translation;small.textContent=" · "+item.sourceLanguage+" / "+item.targetLanguage+" · "+item.reviewStatus;li.append(strong,small);list.append(li)}}
function disableWhile(yes){busy=yes;for(const id of ["connectCloud","saveVocabulary","lockCloud"])$(id).disabled=yes}
function lock(){records=[];passphrase="";identity=null;revision=null;connected=false;$("vaultPassphrase").value="";$("saveVocabulary").disabled=true;render();note("Locked. No vocabulary data is retained in the browser after locking.");}
async function connect(){
 if(busy)return;disableWhile(true);
 try{const pass=$("vaultPassphrase").value;if(pass.length<12)throw Error("Enter a vault passphrase of at least 12 characters.");
 const {b,status}=await readyBridge(),remote=await b.get({namespace:NS,identity:status.identity});
 if(remote?.authenticated!==true||remote?.namespace!==NS||remote?.identity!==status.identity||!Number.isSafeInteger(remote?.revision)||remote.revision<0)throw Error("Unverified encrypted storage read receipt");
 const parsed=await decrypt(remote.envelope??null,pass);
 if(!valid(parsed.entries))throw Error("Invalid vocabulary record content");
 records=parsed.entries;revision=remote.revision;identity=status.identity;passphrase=pass;connected=true;$("vaultPassphrase").value="";$("saveVocabulary").disabled=false;render();note("Connected to authorized encrypted STOS storage. "+records.length+" vocabulary entries available.");
 }catch(err){lock();note(err.message||"Encrypted cloud access failed.",true)}
 finally{disableWhile(false);$("saveVocabulary").disabled=!connected}
}
async function save(){
 if(busy||!connected)return;disableWhile(true);
 try{const {b,status}=await readyBridge();if(status.identity!==identity)throw Error("Storage identity changed. Vault locked.");
 const word=sanitize($("word").value,MAX_WORD),translation=sanitize($("translation").value,MAX_TRANSLATION),sourceLanguage=sanitize($("sourceLanguage").value,24).toLowerCase(),targetLanguage=sanitize($("targetLanguage").value,24).toLowerCase();
 if(!word||!translation||!valid([{word,translation,sourceLanguage,targetLanguage}]))throw Error("Enter a word, proposed translation, and valid language codes.");
 const next=records.slice(),key=[sourceLanguage,targetLanguage,word.normalize("NFKC").toLocaleLowerCase()].join("|");
 if(next.some(e=>[e.sourceLanguage,e.targetLanguage,e.word.normalize("NFKC").toLocaleLowerCase()].join("|")===key))throw Error("That word and language pair already exists. No duplicate was saved.");
 if(next.length>=MAX)throw Error("Encrypted vocabulary capacity reached.");
 next.push({word,translation,sourceLanguage,targetLanguage,reviewStatus:"unreviewed",provenance:"manual-entry",addedAt:new Date().toISOString()});
 const envelope=await encrypt({schema:NS,version:1,entries:next},passphrase),digest=await sha(envelope);
 const result=await b.put({namespace:NS,identity,expectedRevision:revision,envelope,ciphertextSha256:digest});
 if(result?.authenticated!==true||result?.durable!==true||result?.namespace!==NS||result?.identity!==identity||result?.ciphertextSha256!==digest||!Number.isSafeInteger(result?.revision)||result.revision<=revision)throw Error("STOS durable readback receipt missing or invalid. Nothing confirmed.");
 const check=await b.get({namespace:NS,identity});
 if(check?.authenticated!==true||check?.revision!==result.revision||check?.identity!==identity||await sha(check.envelope)!==digest)throw Error("STOS readback did not confirm exact ciphertext. Treat save as unverified.");
 records=next;revision=result.revision;render();$("word").value="";$("translation").value="";note("Encrypted and durably confirmed: 1 new unreviewed vocabulary pair.");
 }catch(err){note((err.message||"Save failed")+" Existing entries were not replaced locally.",true)}
 finally{disableWhile(false);$("saveVocabulary").disabled=!connected}
}
$("connectCloud").addEventListener("click",connect);
$("saveVocabulary").addEventListener("click",save);
$("lockCloud").addEventListener("click",lock);
addEventListener("pagehide",lock,{once:true});
render();
note("STOS vocabulary storage is not connected. Save stays disabled until authorized off-controller storage is available.");
})();
import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const source=readFileSync(new URL("../assets/polyglot-mentor-voice-profiles.v1.js",import.meta.url),"utf8");
const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
const sandbox={};vm.createContext(sandbox);vm.runInContext(source,sandbox);
const z=sandbox.PolyglotMentorVoiceProfiles.get("zelle");
const pierre=sandbox.PolyglotMentorVoiceProfiles.get("pierre");
test("Zelle default is English Samantha at rate 1.10 and pitch 1.45",()=>{
 assert.equal(z.voiceName,"Samantha");assert.equal(z.lang,"en-US");
 assert.equal(z.rate,1.10);assert.equal(z.pitch,1.45);assert.equal(z.playback,"opt-in");
});
test("Pierre's existing Arthur-en-GB profile is not replaced",()=>{
 assert.equal(pierre.voiceName,"Arthur");assert.equal(pierre.lang,"en-GB");
 assert.ok(!("rate" in pierre));assert.ok(!("pitch" in pierre));
});
test("Polyglot loads shared profile before voice engine and keeps user choice",()=>{
 const script=html.indexOf('src="./assets/polyglot-mentor-voice-profiles.v1.js"');
 const engine=html.indexOf("const sharedZelleVoice=");
 assert.ok(script>0&&engine>script);
 assert.match(html,/stored\.rate\?\?ZELLE_VOICE_DEFAULT\.rate/);
 assert.match(html,/stored\.pitch\?\?ZELLE_VOICE_DEFAULT\.pitch/);
 assert.match(html,/Object\.hasOwn\(stored,'name'\)/);
 assert.ok(html.includes("stored.name===''&&voicePicker.value==='')return null"));
 assert.match(html,/Samantha is unavailable here/);
});

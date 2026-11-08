/* Polyglot shared public mentor speech preferences. Configuration only.
 * Actual voices are supplied by the visitor's browser/operating system.
 * No recordings, tokens, or user information are accessed or transmitted.
 */
(function(root){"use strict";
const profiles=Object.freeze({
  zelle:Object.freeze({mentorId:"zelle",voiceName:"Samantha",lang:"en-US",rate:1.10,pitch:1.45,localPreferred:true,playback:"opt-in"}),
  pierre:Object.freeze({mentorId:"pierre",voiceName:"Arthur",lang:"en-GB",source:"pierre-existing-voice-profile",playback:"opt-in"})
});
root.PolyglotMentorVoiceProfiles=Object.freeze({
 schema:"polyglot-public-mentor-voice-profiles-v1",
 version:1,
 get(mentorId){const p=profiles[mentorId];return p?Object.freeze({...p}):null}
});
})(typeof globalThis!=="undefined"?globalThis:this);

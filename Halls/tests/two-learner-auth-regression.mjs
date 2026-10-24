import assert from 'node:assert/strict';
// FICTIONAL authorization test only. No STOS connection, learner data or storage mutation.
const ids={a:'fictional-learner-A',b:'fictional-learner-B'};
class FixtureAuthority{
 #grants=new Map(); #epoch=0;
 grant(session,learner,action){this.#grants.set(session+'|'+learner+'|'+action,this.#epoch)}
 revoke(){this.#epoch++;this.#grants.clear()}
 permit(session,learner,action){return this.#grants.get(session+'|'+learner+'|'+action)===this.#epoch}
}
const auth=new FixtureAuthority();
const records=new Map([[ids.a,{owner:ids.a,text:'FICTIONAL A'}],[ids.b,{owner:ids.b,text:'FICTIONAL B'}]]);
function read(session,id){if(!auth.permit(session,id,'read'))return null;const r=records.get(id);return r?.owner===id?{...r}:null}
function review(session,id){if(!auth.permit(session,id,'review'))return false;return records.get(id)?.owner===id}
let checks=0;function test(name,callback){callback();checks++;console.log('PASS '+name)}
test('anonymous denied',()=>assert.equal(read('anon',ids.a),null));
auth.grant('session-A',ids.a,'read');
test('own grant',()=>assert.equal(read('session-A',ids.a)?.text,'FICTIONAL A'));
test('sibling denied',()=>assert.equal(read('session-A',ids.b),null));
test('read not review',()=>assert.equal(review('session-A',ids.a),false));
auth.grant('teacher',ids.a,'review');
test('teacher limited grant',()=>assert.equal(review('teacher',ids.a),true));
test('teacher sibling denied',()=>assert.equal(review('teacher',ids.b),false));
auth.revoke();
test('revoked read denied',()=>assert.equal(read('session-A',ids.a),null));
test('revoked review denied',()=>assert.equal(review('teacher',ids.a),false));
test('identities remain distinct',()=>assert.deepEqual([...records.keys()],[ids.a,ids.b]));
console.log(JSON.stringify({result:'PASS',checks,liveServiceCertified:false}));

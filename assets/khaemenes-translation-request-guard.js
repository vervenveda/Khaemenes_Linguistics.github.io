/* Sovereign Translator asynchronous context guard — browser-safe, no storage.
 * A newer action invalidates all older requests and aborts their fetches.
 * Captured source/language/service are checked again before any output or cache write.
 */
(function(root){"use strict";
function createTranslationRequestGuard(){
 let epoch=0,controller=null;
 function invalidate(){
  epoch++;
  if(controller){controller.abort();controller=null}
  return epoch;
 }
 function start(snapshot){
  invalidate();
  controller=new AbortController();
  const token=epoch;
  const expected=Object.freeze({...snapshot});
  return Object.freeze({token,expected,signal:controller.signal});
 }
 function isCurrent(request,current){
  if(!request||request.token!==epoch||request.signal.aborted||!current)return false;
  return Object.keys(request.expected).every(k=>current[k]===request.expected[k]);
 }
 function finish(request){if(request&&request.token===epoch)controller=null}
 return Object.freeze({start,invalidate,isCurrent,finish});
}
root.KhaemenesTranslationRequestGuard=Object.freeze({version:"1.0.0",createTranslationRequestGuard});
})(window);

#!/usr/bin/env node
import {readFileSync} from "node:fs";
const hall=readFileSync("Halls/index.html","utf8");
const helper=readFileSync("assets/v4-learner-scope.js","utf8");
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg)};

for(const token of [
 "BACKUP_FORMAT",
 "makeBackup",
 "validateBackup",
 "restoreBackup",
 "undoLastRestore",
 "recoverySummary",
 "before-backup-restore"
])check(helper.includes(token),"Backup helper missing "+token);

for(const id of [
 "exportLearnerBackup",
 "learnerBackupFile",
 "learnerBackupPreview",
 "confirmLearnerRestore",
 "undoLearnerRestore",
 "learnerBackupStatus"
])check(hall.includes('id="'+id+'"')||hall.includes('$("#'+id+'")'),"Hall backup control missing "+id);

check(hall.includes("SCOPE.makeBackup(state)"),"Hall does not export scoped learner backup");
check(hall.includes("SCOPE.validateBackup"),"Hall does not validate backup before restore");
check(hall.includes("SCOPE.restoreBackup(pendingLearnerBackup)"),"Hall restore path missing");
check(hall.includes("SCOPE.undoLastRestore()"),"Hall undo recovery path missing");
check(hall.includes("file.size>2000000"),"Hall backup file-size limit missing");
check(hall.includes("parsed.learner.id!==current.id"),"Hall learner-identity guard missing");
check(hall.includes("current record will first be saved as a local recovery snapshot"),"Hall restore confirmation does not disclose recovery behavior");
check(!helper.includes("safeSet(LEGACY_KEY,JSON.stringify(restored))"),"Restore helper writes restored learner into legacy shared V4");
check(!helper.includes("safeRemove(OLD_V3_KEY)"),"Backup helper can remove V3");

if(errors.length){console.error("V4_BACKUP_INTEGRATION=FAIL\n"+errors.map(x=>" - "+x).join("\n"));process.exitCode=1}
else console.log("V4_BACKUP_INTEGRATION=PASS; named-only=1; pre-restore-recovery=1; legacy-writes=0");

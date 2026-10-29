import path from 'node:path';
import {existsSync} from 'node:fs';
import {checkRun} from './checks.ts';
import {brand, loadLedger, loadTiming, readJson, runDirFromArgs} from './lib.ts';

const runDir = runDirFromArgs();
const sbFile = path.join(runDir, 'storyboard.json');
const report = checkRun({
	storyboard: existsSync(sbFile) ? readJson(sbFile) : null,
	ledger: loadLedger(runDir),
	timing: loadTiming(runDir),
	brand: brand(),
});

console.log(JSON.stringify(report.stats));
for (const w of report.warnings) console.log(`WARN  ${w}`);
for (const e of report.errors) console.log(`FAIL  ${e}`);
console.log(report.errors.length ? `\n✗ ${report.errors.length} problem(s) to fix` : '\n✓ all checks passed');
process.exit(report.errors.length ? 1 : 0);

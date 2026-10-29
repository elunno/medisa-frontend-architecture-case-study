import fs from 'node:fs';
import path from 'node:path';

const required = [
  'README.md',
  'ARCHITECTURE.md',
  'TESTING.md',
  'docs/appendices/evidence-and-claims.md',
  'docs/deep-dives/01-entitlements.md',
  'docs/deep-dives/02-persistent-audio.md',
  'docs/deep-dives/03-booking-and-payment.md',
  'docs/deep-dives/04-mood-recommendation.md',
  'docs/deep-dives/05-assessment-engine.md',
  'reference-model/README.md',
  'diagrams/system-context.svg',
  'diagrams/domain-boundaries.svg',
  'diagrams/entitlement-flow.svg',
  'diagrams/audio-state-machine.svg',
  'diagrams/booking-flow.svg',
  'diagrams/assessment-flow.svg'
];

const missing = required.filter((file) => !fs.existsSync(path.join(process.cwd(), file)));
if (missing.length) {
  console.error('Missing required repository files:\n' + missing.map((x) => ` - ${x}`).join('\n'));
  process.exit(1);
}

for (const dotName of fs.readdirSync('diagrams').filter((name) => name.endsWith('.dot'))) {
  const svgName = dotName.replace(/\.dot$/, '.svg');
  if (!fs.existsSync(path.join('diagrams', svgName))) {
    console.error(`Missing rendered diagram for ${dotName}: ${svgName}`);
    process.exit(1);
  }
}

console.log('Repository structure check passed.');

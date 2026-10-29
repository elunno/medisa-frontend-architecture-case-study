import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const markdownFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.md')) markdownFiles.push(full);
  }
}

walk(root);
const failures = [];
const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(linkPattern)) {
    const raw = match[1].trim().replace(/^<|>$/g, '');
    if (!raw || raw.startsWith('#') || /^[a-z]+:\/\//i.test(raw) || raw.startsWith('mailto:')) continue;
    const target = decodeURIComponent(raw.split('#')[0]);
    if (!target) continue;
    const resolved = path.resolve(path.dirname(file), target);
    if (!fs.existsSync(resolved)) failures.push(`${path.relative(root, file)} -> ${raw}`);
  }
}

if (failures.length) {
  console.error('Broken relative links:\n' + failures.map((x) => ` - ${x}`).join('\n'));
  process.exit(1);
}
console.log(`Link check passed (${markdownFiles.length} markdown files).`);

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceDir = path.resolve(scriptDir, '../..');
const check = process.argv.includes('--check');
const all = process.argv.includes('--all');

const packages = new Map();
for (const dir of fs.readdirSync(workspaceDir, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const packagePath = path.join(workspaceDir, dir.name, 'package.json');
  if (!fs.existsSync(packagePath)) continue;
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  if (pkg.name?.startsWith('@api-go/') && pkg.version) {
    packages.set(pkg.name.slice('@api-go/'.length), { dir: dir.name, version: pkg.version });
  }
}

const targets = all
  ? [...packages.values()]
  : [(() => {
      const packagePath = path.join(process.cwd(), 'package.json');
      if (!fs.existsSync(packagePath)) throw new Error('Run this command from an @api-go package directory, or pass --all.');
      const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      const target = packages.get(pkg.name?.slice('@api-go/'.length));
      if (!target) throw new Error(`Unsupported package: ${pkg.name || packagePath}`);
      return target;
    })()];

let stale = false;
for (const target of targets) {
  const packageDir = path.join(workspaceDir, target.dir);
  const readmes = fs.readdirSync(packageDir).filter(name => /^README(?:\.[a-z0-9-]+)?\.md$/i.test(name));
  for (const readme of readmes) {
    const readmePath = path.join(packageDir, readme);
    const source = fs.readFileSync(readmePath, 'utf8');
    const output = source.replace(
      /(@api-go\/([a-z0-9-]+)@)(\d+\.\d+\.\d+)(\/(?:dist\/|ui(?:\.min)?\.js))/gi,
      (match, prefix, name, version, suffix) => {
        const dependency = packages.get(name.toLowerCase());
        return dependency ? `${prefix}${dependency.version}${suffix}` : match;
      }
    );
    if (source === output) continue;
    stale = true;
    if (check) console.error(`${target.dir}/${readme} has stale @api-go CDN versions.`);
    else {
      fs.writeFileSync(readmePath, output);
      console.log(`Updated ${target.dir}/${readme}`);
    }
  }
}
if (check && stale) process.exitCode = 1;

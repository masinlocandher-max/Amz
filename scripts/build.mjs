import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
await rm(dist, {recursive:true, force:true});
await mkdir(dist, {recursive:true});
const entries = ['index.html', 'styles.css', 'app.js', 'lib', 'assets'];
for (const entry of entries) await cp(join(root, entry), join(dist, entry), {recursive:true});
await cp(join(root, '_headers'), join(dist, '_headers'));
await stat(join(dist, 'assets/hero.webp'));
console.log('AMZ Jewelry built to dist/ — no dependencies or external asset requests.');

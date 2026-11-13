// make.fun entry for ai-happy-01: copies the bundled artwork to
// /output/entry.png. The judge sees exactly the bytes in entry.png, so the
// program first checks the gate's limits (whole JPEG or PNG, <= 1 MiB).
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(SRC);
if (bytes.length > 1_048_576) throw new Error(`image is ${bytes.length} bytes, over 1 MiB`);
const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
if (!isJpeg && !isPng) throw new Error('entry.png is neither JPEG nor PNG');

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(SRC, join(outDir, 'entry.png'));

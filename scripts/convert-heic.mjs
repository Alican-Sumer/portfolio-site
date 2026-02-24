/**
 * Converts all HEIC files in public/Interests pictures to JPG.
 * Run: npm run convert-heic
 * Requires: npm install heic-convert (dev)
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, '..', 'public', 'Interests pictures');

async function main() {
  let convert;
  try {
    const mod = await import('heic-convert');
    convert = mod.default ?? mod;
  } catch (e) {
    console.error('Run: npm install heic-convert');
    process.exit(1);
  }
  const files = readdirSync(dir).filter((f) => /\.heic$/i.test(f));
  for (const file of files) {
    const inputPath = join(dir, file);
    const outputPath = join(dir, file.replace(/\.heic$/i, '.jpg'));
    console.log('Converting', file, '->', outputPath);
    const inputBuffer = readFileSync(inputPath);
    const outputBuffer = await convert({ buffer: inputBuffer, format: 'JPEG', quality: 0.9 });
    writeFileSync(outputPath, outputBuffer);
  }
  console.log('Done. Converted', files.length, 'files.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

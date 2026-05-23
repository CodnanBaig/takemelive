/**
 * Patches a .splinecode export to remove the embedded Spline watermark PNG.
 * No Spline paid plan required — replaces the watermark texture with transparency.
 *
 * Usage:
 *   curl -L "https://prod.spline.design/<id>/scene.splinecode" -o temp/scene.splinecode
 *   pnpm spline:patch-watermark
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const DEFAULT_INPUT = resolve('temp/scene.splinecode');
const DEFAULT_OUTPUT = resolve('public/assets/spline/footer-scene.splinecode');
const WATERMARK_BLOCK = Buffer.from('SplineWatermarkd');
const WATERMARK_LABEL = Buffer.from('SplineWatermark');
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
const PNG_END = Buffer.from('IEND\xaeB`\x82');

async function createTransparentPng(width, height) {
  const tmpPath = resolve('temp/spline-watermark-patch.png');
  await mkdir(dirname(tmpPath), { recursive: true });

  const python = `from PIL import Image
img = Image.new('RGBA', (${width}, ${height}), (0, 0, 0, 0))
img.save('${tmpPath}', format='PNG', optimize=True)`;

  await execFileAsync('python3', ['-c', python]);
  return readFile(tmpPath);
}

function findWatermarkPng(source) {
  const blockIndex = source.indexOf(WATERMARK_BLOCK);
  if (blockIndex === -1) {
    throw new Error('SplineWatermarkd block not found');
  }

  const pngStart = source.indexOf(PNG_SIGNATURE, blockIndex);
  const pngEnd = source.indexOf(PNG_END, pngStart) + PNG_END.length;

  if (pngStart === -1 || pngEnd <= pngStart) {
    throw new Error('Watermark PNG bounds not found');
  }

  return {
    pngStart,
    pngEnd,
    lengthOffset: pngStart - 2,
  };
}

function patchVisibilityFlags(buffer, searchFrom) {
  const labelIndex = buffer.indexOf(WATERMARK_LABEL, searchFrom);
  if (labelIndex === -1) {
    return buffer;
  }

  const next = Buffer.from(buffer);
  const start = labelIndex + WATERMARK_LABEL.length;

  for (let i = 0; i < 20; i += 1) {
    if (next[start + i] === 1) {
      next[start + i] = 0;
    }
  }

  return next;
}

async function main() {
  const inputPath = resolve(process.argv[2] ?? DEFAULT_INPUT);
  const outputPath = resolve(process.argv[3] ?? DEFAULT_OUTPUT);

  const source = Buffer.from(await readFile(inputPath));
  const { pngStart, pngEnd, lengthOffset } = findWatermarkPng(source);

  const originalPng = source.subarray(pngStart, pngEnd);
  const width = originalPng.readUInt32BE(16);
  const height = originalPng.readUInt32BE(20);
  const transparentPng = await createTransparentPng(width, height);

  const lengthBytes = Buffer.from([
    (transparentPng.length >> 8) & 0xff,
    transparentPng.length & 0xff,
  ]);

  let patched = Buffer.concat([
    source.subarray(0, lengthOffset),
    lengthBytes,
    transparentPng,
    source.subarray(pngEnd),
  ]);

  patched = patchVisibilityFlags(patched, pngEnd);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, patched);

  console.log(
    `Patched watermark (${width}x${height}) -> ${outputPath} (${source.length} -> ${patched.length} bytes)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

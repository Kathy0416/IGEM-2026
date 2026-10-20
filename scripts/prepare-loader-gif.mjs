import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const sourcePath = resolve("1(1).gif");
const outputPath = resolve("public/1.gif");
const manifestPath = resolve("public/loader.json");
const source = readFileSync(sourcePath);
const loopExtension = Buffer.from([
  0x21, 0xff, 0x0b,
  ...Buffer.from("NETSCAPE2.0", "ascii"),
  0x03, 0x01, 0x00, 0x00, 0x00,
]);
const loopOffset = source.indexOf(loopExtension);
if (loopOffset < 0 || source.indexOf(loopExtension, loopOffset + 1) >= 0) {
  throw new Error("Expected exactly one infinite-loop extension in the source GIF");
}

// Removing only the loop extension makes the original GIF stop after one cycle.
// Image blocks, palettes, disposal settings, delays, and pixels remain byte-for-byte intact.
const singleCycle = Buffer.concat([
  source.subarray(0, loopOffset),
  source.subarray(loopOffset + loopExtension.length),
]);
const delays = [];
const skipSubBlocks = start => {
  let cursor = start;
  while (source[cursor] !== 0) cursor += 1 + source[cursor];
  return cursor + 1;
};
let cursor = 13;
if (source[10] & 0x80) cursor += 3 * (2 ** ((source[10] & 0x07) + 1));
while (cursor < source.length) {
  const introducer = source[cursor];
  if (introducer === 0x3b) break;
  if (introducer === 0x21) {
    if (source[cursor + 1] === 0xf9) {
      delays.push(source.readUInt16LE(cursor + 4) * 10);
    }
    cursor = skipSubBlocks(cursor + 2);
    continue;
  }
  if (introducer === 0x2c) {
    const packed = source[cursor + 9];
    cursor += 10;
    if (packed & 0x80) cursor += 3 * (2 ** ((packed & 0x07) + 1));
    cursor = skipSubBlocks(cursor + 1); // Skip LZW minimum code size first.
    continue;
  }
  throw new Error(`Unexpected GIF block 0x${introducer.toString(16)}`);
}
if (!delays.length || delays.some(delay => delay <= 0)) {
  throw new Error("The source GIF must provide positive frame delays");
}
writeFileSync(outputPath, singleCycle);
writeFileSync(manifestPath, `${JSON.stringify({
  width: source.readUInt16LE(6),
  height: source.readUInt16LE(8),
  frameDurations: delays,
  duration: delays.reduce((total, delay) => total + delay, 0),
  sourceSha256: createHash("sha256").update(source).digest("hex"),
})}\n`);
console.log(`Prepared original GIF for one ${delays.reduce((a, b) => a + b, 0)} ms cycle.`);

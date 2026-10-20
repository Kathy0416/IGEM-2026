import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const original = readFileSync("1(1).gif");
const playback = readFileSync("public/1.gif");
const metadata = JSON.parse(readFileSync("public/loader.json", "utf8"));
const html = readFileSync("index.html", "utf8");
const controller = readFileSync("src/loader.js", "utf8");
const loopExtension = Buffer.from([
  0x21, 0xff, 0x0b,
  ...Buffer.from("NETSCAPE2.0", "ascii"),
  0x03, 0x01, 0x00, 0x00, 0x00,
]);
const loopOffset = original.indexOf(loopExtension);

assert(loopOffset >= 0, "Original GIF has an infinite-loop extension");
assert.equal(playback.indexOf(loopExtension), -1, "Playback GIF stops after one cycle");
assert.deepEqual(
  playback,
  Buffer.concat([original.subarray(0, loopOffset), original.subarray(loopOffset + loopExtension.length)]),
  "Only the loop extension is removed; all visual GIF data stays original",
);
assert.deepEqual(metadata.frameDurations, [1000, 1000, 1000, 1000, 1000, 1000]);
assert.equal(metadata.duration, 6000);
assert.match(html, /<img id="site-loader-art" alt="" \/>/);
assert.doesNotMatch(html, /<canvas id="site-loader-art"/);
assert.match(controller, /cloneNode\(false\)/);
assert.match(controller, /animation\.duration/);
assert.doesNotMatch(controller, /loader-frames|getContext|drawImage/);
console.log("Loader checks passed: original GIF data, one cycle, verified timing, and no PNG rendering.");

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync("public/loader.js", "utf8");
const manifest = JSON.parse(readFileSync("public/loader-frames/manifest.json"));
const duration = manifest.frames.reduce((sum, frame) => sum + frame.duration, 0);
async function setup(broken = false) {
  let now = 0;
  const tasks = [];
  const events = {};
  const draws = [];
  const classes = new Set(["wiki-loader-visible"]);
  const elements = Object.fromEntries(["root", "site-loader-art", "site-loader-message", "site-loader-retry"].map(id => [id, {
    dataset: {}, addEventListener: (name, fn) => { events[id + name] = fn; },
  }]));
  elements["site-loader-art"].getContext = () => ({ clearRect() {}, drawImage(image) { draws.push(image.src); } });
  const schedule = (fn, delay) => { const task = { fn, at: now + delay }; tasks.push(task); return task; };
  const cancel = task => { if (task) task.cancelled = true; };
  const window = { addEventListener: (name, fn) => { events[name] = fn; } };
  vm.runInNewContext(source, {
    window, URL, Image: class { decode() { return broken ? Promise.reject(Error("failed")) : Promise.resolve(); } },
    document: { currentScript: { src: "https://wiki.test/worldshaper-nanjing/loader.js" },
      documentElement: { classList: { add: (...names) => names.forEach(n => classes.add(n)), remove: (...names) => names.forEach(n => classes.delete(n)) } },
      getElementById: id => elements[id] },
    location: { pathname: "/worldshaper-nanjing/", search: "", hash: "", reload() {} },
    fetch: async () => ({ ok: true, json: async () => manifest }),
    setTimeout: schedule, clearTimeout: cancel, requestAnimationFrame: fn => schedule(fn, 0), cancelAnimationFrame: cancel,
    matchMedia: () => ({ matches: false }),
  });
  const flush = async () => { for (let i = 0; i < 20; i++) await Promise.resolve(); };
  await flush();
  return { window, events, draws, elements, classes, flush, tick(ms) {
    const end = now + ms;
    while (true) {
      tasks.sort((a, b) => a.at - b.at);
      const task = tasks.find(t => !t.cancelled && t.at <= end);
      if (!task) break;
      task.cancelled = true; now = task.at; task.fn();
    }
    now = end;
  } };
}
const fast = await setup();
const id = fast.window.wikiLoader.enter("/worldshaper-nanjing/");
fast.window.wikiLoader.ready(id);
assert.equal(fast.window.wikiLoader.enter("/worldshaper-nanjing/"), id, "Strict Mode does not restart");
fast.tick(duration - 1);
assert(!fast.classes.has("wiki-loader-fading"));
fast.tick(1);
assert(fast.classes.has("wiki-loader-fading"));
fast.tick(200);
assert(!fast.classes.has("wiki-loader-visible"));
assert.equal(fast.draws.length, manifest.frames.length);
fast.tick(20000);
assert.equal(fast.draws.length, manifest.frames.length, "No background animation");

const slow = await setup();
slow.tick(duration + 9000);
assert(slow.classes.has("wiki-loader-visible"));
assert.equal(slow.draws.length, manifest.frames.length, "Hold final frame");
slow.window.wikiLoader.ready(1);
slow.tick(200);
assert(!slow.classes.has("wiki-loader-visible"));

const navigation = await setup();
navigation.tick(2000);
const old = navigation.window.wikiLoader.enter("/worldshaper-nanjing/description");
const current = navigation.window.wikiLoader.enter("/worldshaper-nanjing/team");
navigation.window.wikiLoader.ready(old);
await navigation.flush();
navigation.tick(duration + 200);
assert(navigation.classes.has("wiki-loader-visible"), "Stale readiness ignored");
navigation.window.wikiLoader.ready(current);
navigation.tick(200);
assert(!navigation.classes.has("wiki-loader-visible"));
navigation.events.pagehide();
navigation.events.pageshow({ persisted: true });
await navigation.flush();
navigation.tick(duration + 200);
assert(!navigation.classes.has("wiki-loader-visible"), "Restored page completes once");

const failure = await setup(true);
failure.tick(20000);
assert.equal(failure.elements["site-loader-retry"].hidden, false);
assert(failure.classes.has("wiki-loader-visible"));
console.log("Loader checks passed: exact frame sequence, readiness, navigation cancellation, Strict Mode, restore, failure.");

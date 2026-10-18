// Run against the wiki preview and a dedicated Chrome remote-debugging session.
// No browser dependency is added to the site. Screenshots are local QA artifacts.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base =
  process.env.WIKI_PREVIEW_URL ?? "http://127.0.0.1:5199/worldshaper-nanjing/";
const debugging = process.env.WIKI_BROWSER_URL ?? "http://127.0.0.1:9333";
const tabs = await (await fetch(`${debugging}/json`)).json();
const socket = new WebSocket(
  tabs.find((tab) => tab.type === "page").webSocketDebuggerUrl,
);
await new Promise((resolve) =>
  socket.addEventListener("open", resolve, { once: true }),
);
let sequence = 0;
const pending = new Map();
const errors = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject, timer } = pending.get(message.id);
    pending.delete(message.id);
    clearTimeout(timer);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  } else if (message.method === "Runtime.exceptionThrown")
    errors.push(message.params.exceptionDetails.text);
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timed out: ${method}`));
    }, 20000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails)
    throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const output = "artifacts/longform";
await mkdir(output, { recursive: true });
await send("Runtime.enable");
await send("Page.enable");
await send("Page.bringToFront");
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});

async function navigate(route) {
  await send("Page.navigate", { url: base + route });
  await wait(250);
  for (let i = 0; i < 80; i++) {
    if (
      await evaluate(
        `document.querySelector('[data-content-page="${route || "home"}"]') !== null`,
      )
    )
      return;
    await wait(100);
  }
  throw new Error(`Page did not render: ${route}`);
}
async function screenshot(name) {
  await wait(300);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  await writeFile(`${output}/${name}.png`, Buffer.from(shot.data, "base64"));
}
async function change(selector, value) {
  await evaluate(
    `(() => { const e = document.querySelector(${JSON.stringify(selector)}); const proto = e.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(proto,'value').set.call(e,${JSON.stringify(value)}); e.dispatchEvent(new Event('input',{bubbles:true})); e.dispatchEvent(new Event('change',{bubbles:true})); })()`,
  );
  await wait(120);
}
const routes = [
  "",
  "description",
  "contribution",
  "engineering",
  "experiments",
  "part",
  "protocol",
  "measurement",
  "notebook",
  "safety-and-security",
  "model",
  "binder-viewer",
  "human-practices",
  "education",
  "entrepreneurship",
  "team",
  "attributions",
];
const report = [];
try {
  await navigate("");
  for (const width of [1440, 375, 768, 1024, 1920]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false,
    });
    for (const theme of ["light", "dark"]) {
      await evaluate(`localStorage.setItem('wiki-theme','${theme}')`);
      for (const route of [1440, 375].includes(width)
        ? routes
        : ["description", "protocol", "notebook", "team"]) {
        await navigate(route);
        const state = await evaluate(`(() => {
          const ids = [...document.querySelectorAll('[id]')].map(e=>e.id);
          const links = [...document.querySelectorAll('.article-contents a')];
          const paragraph = document.querySelector('.article-prose > p:not(:has(strong:only-child))');
          const style = paragraph && getComputedStyle(paragraph);
          const nav = [...document.querySelectorAll('.site-nav__inner > *')].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.getBoundingClientRect()).sort((a,b)=>a.x-b.x);
          return { theme:document.documentElement.dataset.theme, h1:document.querySelectorAll('h1').length, duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i), badAnchors:links.filter(a=>!document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a=>a.hash), overflow:document.documentElement.scrollWidth>innerWidth+1, navOverlap:nav.some((r,i)=>i>0&&r.x<nav[i-1].right-1), paragraphs:document.querySelectorAll('.article-prose p').length, bodyFont:style?.fontSize, lineHeight:style?.lineHeight, paragraphWidth:paragraph?.getBoundingClientRect().width, tocMobile:getComputedStyle(document.querySelector('.article-contents__mobile')).display!=='none', notices:document.querySelectorAll('.layout-sample').length, images:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src) };
        })()`);
        report.push({ route, width, ...state });
        assert.equal(state.theme, theme);
        assert.equal(state.h1, 1, `${route}: extra H1`);
        assert.deepEqual(state.duplicateIds, [], `${route}: duplicate IDs`);
        assert.deepEqual(state.badAnchors, [], `${route}: broken contents`);
        assert(!state.overflow, `${route} at ${width}: horizontal overflow`);
        assert(!state.navOverlap, `${route}: overlapping navigation`);
        assert.equal(state.notices, 1);
        assert.equal(state.tocMobile, width < 1100);
        assert.equal(state.bodyFont, width <= 760 ? "17px" : "18px");
        assert.deepEqual(state.images, []);
        if (
          [1440, 375].includes(width) &&
          ["description", "protocol", "notebook", "team"].includes(route)
        ) {
          await evaluate(
            `scrollTo({top:document.querySelector('.reading-layout').getBoundingClientRect().top+scrollY-120,behavior:'instant'})`,
          );
          await screenshot(`${route}-${width}-${theme}`);
        }
      }
    }
  }

  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await navigate("engineering");
  const secondDesign = await evaluate(
    `document.querySelectorAll('.article-prose h3')[5].id`,
  );
  await send("Page.navigate", { url: `${base}engineering#${secondDesign}` });
  await wait(400);
  assert(
    await evaluate(
      `Math.abs(document.getElementById('${secondDesign}').getBoundingClientRect().top-128)<40`,
    ),
    "Deep-link offset",
  );
  assert(
    await evaluate(
      `document.querySelector('.article-contents a[aria-current="location"]')?.hash==='#${secondDesign}'`,
    ),
    "Active contents tracking",
  );

  await navigate("protocol");
  await change('.record-filters input[type="search"]', "Preparation");
  assert.equal(
    await evaluate(
      `document.querySelectorAll('.article-section--record').length`,
    ),
    1,
  );
  await change('.record-filters input[type="search"]', "no-such-procedure");
  assert.equal(
    await evaluate(
      `document.querySelectorAll('.article-section--record').length`,
    ),
    0,
  );
  await evaluate(`document.querySelector('.record-filters button').click()`);
  await wait(80);
  assert.equal(
    await evaluate(
      `document.querySelectorAll('.article-section--record').length`,
    ),
    3,
  );

  await navigate("notebook");
  await change(".record-filters select", "Wet Lab");
  assert.equal(
    await evaluate(
      `document.querySelectorAll('.article-section--record').length`,
    ),
    1,
  );
  await change('.record-filters input[type="date"]', "2026-03-01");
  assert.equal(
    await evaluate(
      `document.querySelectorAll('.article-section--record').length`,
    ),
    0,
  );
  await evaluate(`document.querySelector('.record-filters button').click()`);
  await wait(80);
  await change('.record-filters input[type="date"]', "2026-02-18");
  await change(".record-filters label:nth-of-type(4) input", "2026-03-09");
  assert.equal(
    await evaluate(
      `document.querySelectorAll('.article-section--record').length`,
    ),
    2,
    "Inclusive date range",
  );
  await change(".record-filters label:nth-of-type(4) input", "2026-01-01");
  assert(
    await evaluate(
      `document.querySelector('.record-browser [role="status"]').textContent.includes('end date')`,
    ),
  );

  await navigate("description");
  await change(".site-search--desktop input", "Sicilia cannot show");
  assert(
    await evaluate(
      `document.querySelectorAll('.site-search--desktop [role="option"]').length>0`,
    ),
    "Body text search",
  );
  await evaluate(
    `document.querySelector('.site-search--desktop input').focus()`,
  );
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Enter",
    text: "\r",
    code: "Enter",
    windowsVirtualKeyCode: 13,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Enter",
    code: "Enter",
    windowsVirtualKeyCode: 13,
  });
  await wait(300);
  assert(
    await evaluate(
      `location.hash.startsWith('#article-') && !!document.getElementById(location.hash.slice(1))`,
    ),
    "Search result deep link",
  );

  await navigate("team");
  assert.equal(
    await evaluate(`document.querySelectorAll('.person-trigger').length`),
    19,
  );
  await evaluate(`document.querySelector('.person-trigger').click()`);
  await wait(150);
  assert(
    await evaluate(
      `document.querySelector('[role="dialog"]').textContent.includes('Jay')`,
    ),
  );
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await wait(100);
  assert(
    await evaluate(
      `!document.querySelector('[role="dialog"]') && document.activeElement.classList.contains('person-trigger')`,
    ),
  );

  await evaluate(`document.querySelector('.theme-toggle').click()`);
  const chosen = await evaluate(`document.documentElement.dataset.theme`);
  await send("Page.reload");
  await wait(500);
  assert.equal(
    await evaluate(`document.documentElement.dataset.theme`),
    chosen,
  );
  await evaluate(`scrollTo({top:1500,behavior:'instant'})`);
  await wait(120);
  await evaluate(`document.querySelector('.back-to-top').click()`);
  await wait(150);
  assert.equal(await evaluate(`scrollY`), 0);

  await send("Emulation.setDeviceMetricsOverride", {
    width: 375,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await navigate("description");
  await evaluate(
    `document.querySelector('.article-contents__mobile summary').click()`,
  );
  assert(
    await evaluate(`document.querySelector('.article-contents__mobile').open`),
  );
  await evaluate(
    `document.querySelector('.article-contents__mobile a[href$="#article-proposed-approach"]').click()`,
  );
  await wait(200);
  assert(
    await evaluate(
      `!document.querySelector('.article-contents__mobile').open && location.hash==='#article-proposed-approach'`,
    ),
  );
  await screenshot("description-mobile-figure");
  assert.deepEqual(errors, [], "Browser runtime errors");
  await writeFile(
    `${output}/browser-report.json`,
    JSON.stringify({ pages: report, interactions: "passed", errors }, null, 2),
  );
  console.log(
    `Passed ${report.length} page/theme/viewport checks; search, contents, filters, dialogs, and theme controls passed.`,
  );
} finally {
  socket.close();
}

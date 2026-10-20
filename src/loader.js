/* One controller owns the HTML shell before and after React mounts. */
(() => {
  const base = new URL(import.meta.env.BASE_URL, location.origin);
  const gifUrl = new URL("1.gif", base);
  const manifestUrl = new URL("loader.json", base);
  const page = document.documentElement;
  const root = document.getElementById("root");
  const loader = document.getElementById("site-loader");
  const retry = document.getElementById("site-loader-retry");
  let art = document.getElementById("site-loader-art");
  let manifest;
  let generation = 0;
  let route = location.pathname + location.search;
  let ready = false;
  let complete = false;
  let failed = false;
  let fading = false;
  let timer;
  let stall;
  let fade;

  const clearWork = () => {
    clearTimeout(timer);
    clearTimeout(stall);
    clearTimeout(fade);
  };
  const loadManifest = () => {
    if (!manifest) {
      manifest = fetch(manifestUrl).then(response => {
        if (!response.ok) throw new Error("Animation metadata unavailable");
        return response.json();
      }).catch(error => { manifest = undefined; throw error; });
    }
    return manifest;
  };
  const showError = text => {
    loader.setAttribute("aria-label", text);
    retry.hidden = false;
  };
  const finish = () => {
    if (!ready || !complete || failed || fading) return;
    fading = true;
    clearTimeout(stall);
    const id = generation;
    page.classList.add("wiki-loader-fading");
    fade = setTimeout(() => {
      if (id !== generation) return;
      page.classList.remove("wiki-loader-visible", "wiki-loader-fading");
      root.inert = false;
      let target;
      try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { /* Invalid hash. */ }
      if (target) target.focus({ preventScroll: true });
      else if (document.activeElement === retry || document.activeElement === document.body) {
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }
    }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 200);
  };
  const start = () => {
    clearWork();
    const id = ++generation;
    ready = complete = failed = fading = false;
    page.classList.remove("wiki-loader-fading");
    page.classList.add("wiki-loader-visible");
    root.inert = true;
    retry.hidden = true;
    loader.setAttribute("aria-label", "Loading website");

    // A fresh image element and fragment restart the cached GIF at frame one.
    const nextArt = art.cloneNode(false);
    nextArt.dataset.playback = "loading";
    art.replaceWith(nextArt);
    art = nextArt;
    art.addEventListener("error", () => {
      if (id !== generation) return;
      failed = true;
      clearTimeout(stall);
      showError("The loading animation could not load. Check your connection and retry.");
    }, { once: true });
    Promise.all([
      loadManifest(),
      new Promise((resolve, reject) => {
        art.addEventListener("load", resolve, { once: true });
        art.addEventListener("error", reject, { once: true });
        art.src = `${gifUrl.href}#navigation-${id}`;
      }),
    ]).then(([animation]) => {
      if (id !== generation) return;
      art.dataset.playback = "playing";
      timer = setTimeout(() => {
        if (id !== generation) return;
        art.dataset.playback = "complete";
        complete = true;
        finish();
      }, animation.duration);
    }).catch(() => {
      if (id !== generation || failed) return;
      failed = true;
      clearTimeout(stall);
      showError("The loading animation could not load. Check your connection and retry.");
    });
    stall = setTimeout(() => {
      if (!fading) showError("The site is taking longer than expected. Check your connection and retry.");
    }, 8000);
    return id;
  };

  window.wikiLoader = {
    enter(nextRoute) {
      if (nextRoute !== route) { route = nextRoute; start(); }
      return generation;
    },
    ready(id) {
      if (id !== generation) return;
      ready = true;
      finish();
    },
  };
  retry.addEventListener("click", () => location.reload());
  window.addEventListener("pagehide", () => { clearWork(); generation += 1; });
  window.addEventListener("pageshow", event => {
    if (!event.persisted) return;
    const id = start();
    window.wikiLoader.ready(id);
  });
  start();
})();

/* One controller owns the HTML shell before and after React mounts. */
(() => {
  const base = new URL("loader-frames/", document.currentScript.src);
  const page = document.documentElement;
  const root = document.getElementById("root");
  const canvas = document.getElementById("site-loader-art");
  const context = canvas.getContext("2d");
  const message = document.getElementById("site-loader-message");
  const retry = document.getElementById("site-loader-retry");
  let assets;
  let generation = 0;
  let route = location.pathname + location.search;
  let ready = false;
  let complete = false;
  let failed = false;
  let fading = false;
  let timer;
  let stall;
  let fade;
  let frameRequest;

  function clearWork() {
    clearTimeout(timer);
    clearTimeout(stall);
    clearTimeout(fade);
    cancelAnimationFrame(frameRequest);
  }
  function showError(text) {
    message.textContent = text;
    retry.hidden = false;
  }
  function finish() {
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
  }
  function loadAssets() {
    if (!assets) {
      assets = fetch(new URL("manifest.json", base)).then(response => {
        if (!response.ok) throw new Error("Frame manifest unavailable");
        return response.json();
      }).then(async manifest => {
        const frames = await Promise.all(manifest.frames.map(async frame => {
          const image = new Image();
          image.src = new URL(frame.file, base).href;
          await image.decode();
          return { image, duration: frame.duration };
        }));
        return { ...manifest, frames };
      }).catch(error => { assets = undefined; throw error; });
    }
    return assets;
  }
  function start() {
    clearWork();
    const id = ++generation;
    ready = complete = failed = fading = false;
    page.classList.remove("wiki-loader-fading");
    page.classList.add("wiki-loader-visible");
    root.inert = true;
    retry.hidden = true;
    message.textContent = "Loading website…";
    context?.clearRect(0, 0, canvas.width, canvas.height);
    canvas.dataset.frame = "pending";
    stall = setTimeout(() => {
      if (!fading) showError("The site is taking longer than expected. Check your connection and retry.");
    }, 8000);
    loadAssets().then(animation => {
      if (id !== generation) return;
      if (!context) throw new Error("Canvas unavailable");
      canvas.width = animation.width;
      canvas.height = animation.height;
      let index = 0;
      const draw = () => {
        if (id !== generation) return;
        const frame = animation.frames[index];
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(frame.image, 0, 0);
        canvas.dataset.frame = String(index);
        timer = setTimeout(() => {
          if (id !== generation) return;
          index += 1;
          if (index < animation.frames.length) frameRequest = requestAnimationFrame(draw);
          else {
            complete = true;
            finish();
          }
        }, frame.duration);
      };
      frameRequest = requestAnimationFrame(draw);
    }).catch(() => {
      if (id !== generation) return;
      failed = true;
      clearTimeout(stall);
      showError("The loading animation could not load. Check your connection and retry.");
    });
    return id;
  }
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
    // A restored document already has its route committed.
    window.wikiLoader.ready(id);
  });
  start();
})();

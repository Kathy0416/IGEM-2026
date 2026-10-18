const CACHE_PREFIX = "wiki-shell-";
const SCOPE = self.registration.scope;
const SHELL_URL = new URL("index.html", SCOPE).href;

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const response = await fetch(new URL("offline-manifest.json", SCOPE), { cache: "no-store" });
    if (!response.ok) throw new Error("Offline manifest unavailable");
    const manifest = await response.json();
    const cache = await caches.open(`${CACHE_PREFIX}${manifest.version}`);
    const urls = manifest.files.map((file) => new URL(file, SCOPE).href);
    await cache.addAll(urls);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    const current = names.filter((name) => name.startsWith(CACHE_PREFIX)).at(-1);
    if (!current) return;
    await Promise.all(names.filter((name) => name.startsWith(CACHE_PREFIX) && name !== current).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || !url.href.startsWith(SCOPE)) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      try {
        return await fetch(request, { signal: controller.signal });
      } catch {
        return (await caches.match(SHELL_URL)) || Response.error();
      } finally {
        clearTimeout(timeout);
      }
    })());
    return;
  }

  event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
});

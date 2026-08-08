const CACHE_NAME = "private-defense-portal-shell-v23";
const SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=23",
  "./i18n.js?v=23",
  "./app.js?v=23",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./pdf.worker.min.mjs",
  "./pdfjs-wasm/jbig2.wasm",
  "./pdfjs-wasm/jbig2_nowasm_fallback.js",
  "./pdfjs-wasm/openjpeg.wasm",
  "./pdfjs-wasm/openjpeg_nowasm_fallback.js",
  "./pdfjs-wasm/qcms_bg.wasm",
  "./pdfjs-wasm/quickjs-eval.wasm",
  "./pdfjs-wasm/quickjs-eval.js",
  "./public-profile.json",
  "./vault/config.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === "opaque") return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request)),
  );
});

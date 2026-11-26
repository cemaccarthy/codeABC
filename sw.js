/* codeABC service worker — keeps the app, the score engine and the piano available offline.
   The page itself is fetched network-first so updates arrive as soon as you are online;
   everything else is served from the cache first. */
const SHELL = "codeabc-shell";
const PIANO = "codeabc-piano";
const FONTS = "codeabc-fonts";
const CORE = [
  "./", "./index.html", "./manifest.webmanifest",
  "./vendor/abcjs-basic-min.js", "./vendor/jspdf.umd.min.js", "./vendor/svg2pdf.umd.min.js",
  "./icons/icon.svg", "./icons/apple-touch-icon.png", "./icons/favicon-64.png", "./icons/icon-192.png", "./icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});

async function networkFirst(req) {
  const c = await caches.open(SHELL);
  try {
    const res = await fetch(req);
    if (res && res.ok) c.put(req, res.clone());
    return res;
  } catch (err) {
    return (await c.match(req, { ignoreSearch: true })) || (await c.match("./index.html")) || Response.error();
  }
}
async function cacheFirst(req, name) {
  const c = await caches.open(name);
  const hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone());
  return res;
}
async function staleWhileRevalidate(req, name) {
  const c = await caches.open(name);
  const hit = await c.match(req);
  const net = fetch(req).then(res => { if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()); return res; }).catch(() => hit);
  return hit || net;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (req.mode === "navigate" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/")) {
      e.respondWith(networkFirst(req));
    } else if (url.pathname.includes("/piano/")) {
      e.respondWith(cacheFirst(req, PIANO));
    } else {
      e.respondWith(staleWhileRevalidate(req, SHELL));
    }
  } else if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(staleWhileRevalidate(req, FONTS));
  }
});

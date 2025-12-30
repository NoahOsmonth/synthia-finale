/* eslint-disable no-restricted-globals */

const SHELL_CACHE = "synthia-shell-v1";
const RUNTIME_CACHE = "synthia-runtime-v1";

const SHELL_ASSETS = [
  "/",
  "/dashboard",
  "/offline",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-192-maskable.png",
  "/icons/icon-512-maskable.png",
  "/icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      await cache.addAll(SHELL_ASSETS);
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => ![SHELL_CACHE, RUNTIME_CACHE].includes(k)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

function shouldBypassCache(request) {
  if (request.method !== "GET") return true;
  if (request.destination === "audio" || request.destination === "video") return true;

  const url = new URL(request.url);
  if (url.protocol !== "http:" && url.protocol !== "https:") return true;
  if (url.pathname.startsWith("/_next/webpack-hmr")) return true;

  return false;
}

async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw new Error("network-failed");
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (shouldBypassCache(request)) return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isNavigation = request.mode === "navigate";
  const isApi = isSameOrigin && url.pathname.startsWith("/api/");

  if (isNavigation) {
    event.respondWith(
      (async () => {
        try {
          return await networkFirst(request);
        } catch {
          const cache = await caches.open(SHELL_CACHE);
          return (await cache.match("/offline")) || Response.error();
        }
      })()
    );
    return;
  }

  if (isApi) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (request.destination === "style" || request.destination === "script" || request.destination === "image" || request.destination === "font") {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (isSameOrigin) {
    event.respondWith(cacheFirst(request));
  }
});


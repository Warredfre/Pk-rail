const C = 'pk-shell-v1';
const SHELL = ['./', 'index.html', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css'];
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => { })))).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || /overpass/.test(u.host)) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok && (u.origin === location.origin || /cdnjs/.test(u.host))) { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return r; }).catch(() => caches.match(e.request)));
});

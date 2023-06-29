importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    workbox.strategies.NetworkFirst()
);
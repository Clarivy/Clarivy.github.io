importScripts("/precache-manifest.70041e9fcf854f2e37333140fd1f1cf4.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener("message", (e) => {
  if (!e.data) {
    return;
  }

  switch (e.data) {
    case "skipWaiting":
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});

var dataPush = {};

self.addEventListener("push", (event) => {
  if (event.data) {
    let data = JSON.parse(event.data.text());
    dataPush = data.notification;
    dataPush.body = JSON.parse(dataPush.body);
  }
  var options = {
    body: dataPush.body.body,
    icon: "img/icons/favicon-32x32.png",
    dir: "ltr",
    image: dataPush.image,
    badge: "img/icons/favicon-32x32.png",
    tag: dataPush.tag,
    requireInteraction: true,
    renotify: true,
    actions: [
      {
        action: "visit",
        title: "See More",
      },
    ],
  };
  event.waitUntil(self.registration.showNotification(dataPush.title, options));
});
self.addEventListener(
  "notificationclick",
  (event) => {
    if (event.action === "visit") {
      clients.openWindow(dataPush.body.learnMore);
    } else {
      clients.openWindow("/");
    }
    event.notification.close();
  },
  false
);

workbox.core.setCacheNameDetails({
  prefix: "cache",
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


importScripts("/precache-manifest.bfea7079a2b0901c4467a4f636df0f2e.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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
    icon: "img/icons/logo.png",
    dir: "ltr",
    image: dataPush.image,
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
self.__precacheManifest = [].concat(self.__precacheManifest || []);


/* eslint-disable no-var */

/// <reference lib="webworker" />

// Use type assertions instead of interface augmentation
self.addEventListener("push", (event: ExtendableEvent) => {
  const pushEvent = event as PushEvent;
  if (!pushEvent.data) return;

  const data = pushEvent.data.json();
  const options: NotificationOptions = {
    body: data.body || "New update from SarabelaNews24",
    icon: data.icon || "/icon.png",
    badge: data.badge || "/badge.png",
    data: {
      url: data.url || "/",
    },
  };

  pushEvent.waitUntil(
    self.registration.showNotification(data.title || "SarabelaNews24 Update", options)
  );
});

self.addEventListener("notificationclick", (event: ExtendableEvent) => {
  const notificationEvent = event as NotificationEvent;
  notificationEvent.notification.close();

  notificationEvent.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      const url = notificationEvent.notification.data?.url || "/";

      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});
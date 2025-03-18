// Service worker for push notifications

// Push event handler
self.addEventListener("push", (event: any) => {
  if (!event.data) return

  const data = event.data.json()
  const options = {
    body: data.body || "New update from SarabelaNews24",
    icon: data.icon || "/icon.png",
    badge: data.badge || "/badge.png",
    data: {
      url: data.url || "/",
    },
  }

  event.waitUntil(self.registration.showNotification(data.title || "SarabelaNews24 Update", options))
})

// Notification click handler
self.addEventListener("notificationclick", (event: any) => {
  event.notification.close()

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList: any) => {
      const url = event.notification.data?.url || "/"

      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus()
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(url)
      }
    }),
  )
})


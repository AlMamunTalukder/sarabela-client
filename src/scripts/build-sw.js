
import fs from 'fs'
import path from 'path'
import {execSync} from 'child_process'

// Paths
const srcPath = path.join(__dirname, "../src/sw.ts")
const destPath = path.join(__dirname, "../public/sw.js")

// Ensure the public directory exists
if (!fs.existsSync(path.join(__dirname, "../public"))) {
  fs.mkdirSync(path.join(__dirname, "../public"), { recursive: true })
}

try {
  // Check if the source file exists
  if (!fs.existsSync(srcPath)) {
    console.log("Service worker source file not found. Creating a default one...")

    // Create the src directory if it doesn't exist
    const srcDir = path.dirname(srcPath)
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true })
    }

    // Create a default service worker TypeScript file
    const defaultSW = `// Service worker written in TypeScript
// This will be compiled to JavaScript

// Define types for service worker events
interface PushEvent extends ExtendableEvent {
  data?: PushMessageData;
}

interface PushMessageData {
  json(): any;
  text(): string;
}

interface NotificationEvent extends ExtendableEvent {
  notification: Notification;
}

interface Notification {
  close(): void;
  data?: any;
}

// Push event handler
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

// Notification click handler
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
});`

    fs.writeFileSync(srcPath, defaultSW)
    console.log("Default service worker created at", srcPath)
  }

  // Compile TypeScript to JavaScript
  console.log("Compiling service worker...")
  execSync(`npx tsc ${srcPath} --outFile ${destPath} --lib es2020,webworker --target es2020 --module none`)
  console.log("Service worker compiled successfully!")
  console.log("Service worker available at:", destPath)
} catch (error) {
  console.error("Error compiling service worker:", error.message)
  process.exit(1)
}


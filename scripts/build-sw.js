/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// Paths
const srcPath = path.join(__dirname, "../src/sw.ts")
const configPath = path.join(__dirname, "../tsconfig.sw.json")

// Ensure the src directory exists
if (!fs.existsSync(path.dirname(srcPath))) {
  fs.mkdirSync(path.dirname(srcPath), { recursive: true })
}

// Ensure the public directory exists
if (!fs.existsSync(path.join(__dirname, "../public"))) {
  fs.mkdirSync(path.join(__dirname, "../public"), { recursive: true })
}

try {
  // Check if the source file exists
  if (!fs.existsSync(srcPath)) {

    // Create a default service worker TypeScript file
    const defaultSW = `// Service worker written in TypeScript

// Push event handler
self.addEventListener("push", (event: any) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || "New update from SarabelaNews24",
    icon: data.icon || "/icon.png",
    badge: data.badge || "/badge.png",
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "SarabelaNews24 Update", options)
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event: any) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList: any) => {
      const url = event?.notification?.data?.url || "/";

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

  }

  // Compile TypeScript to JavaScript


  try {
    // Try using the TypeScript compiler with the config file
    execSync(`npx tsc --project ${configPath}`, { stdio: "inherit" })

  } catch (compileError) {
    console.error("TypeScript compilation failed. Trying manual approach...")

    // If TypeScript compilation fails, try a simpler approach - copy the JS version directly
    const jsContent = `
self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || "New update from SarabelaNews24",
    icon: data.icon || "/icon.png",
    badge: data.badge || "/badge.png",
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "SarabelaNews24 Update", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      const url = event?.notification?.data?.url || "/";

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

    fs.writeFileSync(path.join(__dirname, "../public/sw.js"), jsContent)

  }

} catch (error) {
  console.error("Error:", error.message)
  process.exit(1)
}


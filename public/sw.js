// Service Worker for AniHublist Push Notifications

const CACHE_NAME = "anihublist-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// Push notification handler
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Novo episódio disponível!",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1",
    },
    actions: [
      {
        action: "explore",
        title: "Ver agora",
      },
      {
        action: "close",
        title: "Fechar",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("AniHublist", options)
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(
      clients.openWindow("/")
    );
  }
});

// Background sync for scheduled notifications
self.addEventListener("sync", (event) => {
  if (event.tag === "check-episodes") {
    event.waitUntil(checkScheduledNotifications());
  }
});

async function checkScheduledNotifications() {
  // This would be called periodically to check for new episodes
  // In a real implementation, this would check the server for updates
}

// Periodic sync for checking new episodes
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "check-new-episodes") {
    event.waitUntil(checkScheduledNotifications());
  }
});

// Service Worker for TaskFlow Pro notifications
// Handles background notifications and notification interactions

const CACHE_NAME = 'taskflow-pro-v1';

// Install event - cache necessary resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/taskflow-icon.png',
        '/taskflow-badge.png',
        '/icons/view.png',
        '/icons/snooze.png'
      ]);
    })
  );
});

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;
  const data = notification.data || {};

  notification.close();

  if (action === 'view') {
    // Open TaskFlow Pro with the specific task
    event.waitUntil(
      clients.openWindow(data.url || '/taskflow')
    );
  } else if (action === 'snooze') {
    // Snooze the notification for 1 hour
    event.waitUntil(
      scheduleSnoozeNotification(data)
    );
  } else {
    // Default action - open TaskFlow Pro
    event.waitUntil(
      clients.openWindow('/taskflow')
    );
  }
});

// Handle notification close events
self.addEventListener('notificationclose', (event) => {
  // Track notification dismissal for analytics
  console.log('Notification dismissed:', event.notification.data);
});

// Function to schedule a snoozed notification
async function scheduleSnoozeNotification(data) {
  // Wait 1 hour (3600000 ms) then show notification again
  setTimeout(() => {
    self.registration.showNotification('🔔 Snoozed Reminder', {
      body: `Reminder: "${data.taskTitle || 'Check your task'}"`,
      icon: '/taskflow-icon.png',
      badge: '/taskflow-badge.png',
      tag: `snooze-${data.taskId}`,
      requireInteraction: true,
      data: data,
      actions: [
        {
          action: 'view',
          title: 'View Task',
          icon: '/icons/view.png'
        },
        {
          action: 'snooze',
          title: 'Snooze 1h',
          icon: '/icons/snooze.png'
        }
      ]
    });
  }, 3600000); // 1 hour
}

// Handle background sync for offline notification scheduling
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-notifications') {
    event.waitUntil(processBackgroundNotifications());
  }
});

async function processBackgroundNotifications() {
  // This would sync with the main app to check for pending notifications
  // In a real implementation, this would coordinate with IndexedDB or another storage mechanism
  console.log('Processing background notifications...');
}
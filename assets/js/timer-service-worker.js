// timer-service-worker.js
self.addEventListener('install', function(event) {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(clients.claim());
  });
  
  self.addEventListener('push', function(event) {
    const title = 'Timer Completed!';
    const options = {
      body: 'Your 10-minute timer has completed!',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0Q0FGNTAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCI+PC9jaXJjbGU+PHBvbHlsaW5lIHBvaW50cz0iMTIgNiAxMiAxMiAxNiAxNCI+PC9wb2x5bGluZT48L3N2Zz4=',
      vibrate: [200, 100, 200]
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    event.waitUntil(
      clients.matchAll({type: 'window'}).then(function(clientList) {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
    );
  });
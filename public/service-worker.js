self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});
self.addEventListener('push', (event) => {
    const data = event.data.json();

    console.log("data", data)
    const notificationTitle = data.notification.title;
    console.log("notificationTitle", notificationTitle)
    const notificationOptions = {
        body: data.notification.body,
        icon: 'your_icon_url_here', 
        data: {
            deep_link: data.notification.deep_link, 
        }
        
    };
    console.log("notificationOptions", notificationOptions)
    
    event.waitUntil(
        self.registration.showNotification(notificationTitle, notificationOptions)
    );

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
            if (clients && clients.length) {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'NEW_NOTIFICATION',
                        title: notificationTitle,
                        body: data.notification.body,
                    });
                });
            } else {
                console.warn('No clients found.');
            }
        })
    );
    console.log("end")
});

/* eslint-disable no-undef */

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA07jhpvd_SZmwaLflaIJHWCNbl6PeE9xM",
  authDomain: "final-project-b5c6b.firebaseapp.com",
  projectId: "final-project-b5c6b",
  messagingSenderId: "770741349074",
  appId: "1:770741349074:web:42c44774c54d4f94ad5b0b",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background message received:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/vite.svg",
  });
});

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA07jhpvd_SZmwaLflaIJHWCNbl6PeE9xM",
  authDomain: "final-project-b5c6b.firebaseapp.com",
  projectId: "final-project-b5c6b",
  storageBucket: "final-project-b5c6b.firebasestorage.app",
  messagingSenderId: "770741349074",
  appId: "1:770741349074:web:42c44774c54d4f94ad5b0b",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

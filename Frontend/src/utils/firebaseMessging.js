import { getToken } from "firebase/messaging";
import { messaging } from "../../public/firebaseConfig";

export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: "BJYzkbC5DNDXJpf7E9-RsccxcMsWdYCq_AyZInfdXijfNMpN4XPnMv-2Xwjw8hoCbHscoEH3xKiJkShlQpXyNRA",
    });

    if (token) {
      console.log("🔥 FCM Token:", token);
    } else {
      console.log("No registration token available");
    }
  } catch (err) {
    console.error("Error getting token:", err);
  }
};

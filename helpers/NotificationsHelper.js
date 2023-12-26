import * as Notifications from 'expo-notifications';
import { db } from '../firebaseConfig';
import { doc, updateDoc  } from "firebase/firestore"; 

export async function registerForPushNotificationsAsync() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true, // This will show the notification as an alert even when the app is in the foreground
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });

  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  
  // This is where you might want to send the token to your backend
  console.log(token);

  return token;
}

export async function saveTokenToDatabase(token) {
  // Assume a Firebase backend
  const userId = 'jcQtVKCUO4NOZFXEiAizRgWaR0N2'; // The ID of the current user

  await updateDoc(doc(db, "users", userId), {
    expoPushToken: token
  });

  /*
  await storage
    .collection('users')
    .doc(userId)
    .update({
      expoPushToken: token,
    });
  */
}
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcit06jXzX8ne2SkckXxnbTKW0rzX4kbA",
  authDomain: "volito-test.firebaseapp.com",
  projectId: "volito-test",
  storageBucket: "volito-test.appspot.com",
  messagingSenderId: "959636977041",
  appId: "1:959636977041:web:115378007231d2535c9630",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);

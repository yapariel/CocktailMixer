
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABy_vW1J7-8hbUYJKZ6HXRVzvYIRvjwbk",
  authDomain: "drinkmixer-2024.firebaseapp.com",
  projectId: "drinkmixer-2024",
  storageBucket: "drinkmixer-2024.appspot.com",
  messagingSenderId: "874383199398",
  appId: "1:874383199398:web:4b47b204291f7f3ae53867",
  measurementId: "G-PWXTES7F9W"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORE = getFirestore(FIREBASE_APP);

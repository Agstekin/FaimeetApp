// src/firebase/firebaseConfig.js
import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: 'AIzaSyDpILNV05Xjh5h80WWMXOra_CDBSeJB_Xg',
  authDomain: 'faimeetapp.firebaseapp.com',
  projectId: 'faimeetapp',
  storageBucket: 'faimeetapp.appspot.com',
  messagingSenderId: '5592922567982', // <- fake in your msg, replace with correct number
  appId: '1:592922567982:android:0496e1595ed0f98b0706bf', // ← get this from Firebase web app config
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Register Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
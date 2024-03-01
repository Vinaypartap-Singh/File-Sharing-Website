import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFEtW48NYMFjU5VKzDcGHdH6hvyBsA6Mg",
  authDomain: "file-sharing-app-4d470.firebaseapp.com",
  projectId: "file-sharing-app-4d470",
  storageBucket: "file-sharing-app-4d470.appspot.com",
  messagingSenderId: "626962216036",
  appId: "1:626962216036:web:b1bd00c5c532ec927a1b71",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpox2ycVhpIy8PXF5vPpL_Gw-XoeP7WWg",
  authDomain: "stora-aplikasi-kasir.firebaseapp.com",
  projectId: "stora-aplikasi-kasir",
  storageBucket: "stora-aplikasi-kasir.appspot.com",
  messagingSenderId: "10636519610",
  appId: "1:10636519610:web:b34274ccf98a3bcaebba83"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "collect-points-b4314.firebaseapp.com",
  projectId: "collect-points-b4314",
  storageBucket: "collect-points-b4314.appspot.com",
  messagingSenderId: "52673710849",
  appId: "1:52673710849:web:7eac107ff01d61d6d12900",
  databaseURL: "https://console-playground-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  // 先程コピーした値をペースト
  apiKey: "AIzaSyA4khe54pcqyZ5NPeHehYvKYGeC5kDdcBY",
  authDomain: "my-svelte-chat-app-demo.firebaseapp.com",
  databaseURL: "https://my-svelte-chat-app-demo.firebaseio.com",
  projectId: "my-svelte-chat-app-demo",
  storageBucket: "my-svelte-chat-app-demo.appspot.com",
  messagingSenderId: "652196939903",
  appId: "1:652196939903:web:1bf6e67e130c2694ed974a"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
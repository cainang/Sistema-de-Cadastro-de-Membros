import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBOMXnXH1K6pX9lmWffE9K-884PNAv1B_M",
    authDomain: "cad-membros.firebaseapp.com",
    projectId: "cad-membros",
    storageBucket: "cad-membros.appspot.com",
    messagingSenderId: "151047271466",
    appId: "1:151047271466:web:808f810f22c60feab8ff53",
    measurementId: "G-F9J99KHWK9"
});

export default app;
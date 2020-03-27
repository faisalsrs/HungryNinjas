import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

const config = {
    apiKey: "AIzaSyA3aDjOF3FHfjfjYdF5c8OqVLlrxh7fpu4",
    authDomain: "hungryninjas-67650.firebaseapp.com",
    databaseURL: "https://hungryninjas-67650.firebaseio.com",
    projectId: "hungryninjas-67650",
    storageBucket: "hungryninjas-67650.appspot.com",
    messagingSenderId: "116843700702",
    appId: "1:116843700702:web:12a5facb264f2a6fcc7d4f",
    measurementId: "G-QHLWHKS426"
};

firebase.initializeApp(config);

export default firebase;
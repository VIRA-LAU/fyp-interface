import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCDggt-rsnWQtpCCviuq2dgy4N1Jdh4CRI",
    authDomain: "fyp-interface.firebaseapp.com",
    projectId: "fyp-interface",
    storageBucket: "fyp-interface.appspot.com",
    messagingSenderId: "30164132086",
    appId: "1:30164132086:web:04b00815444317def34cd7"
};

const fire = initializeApp(firebaseConfig);

export default fire;

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAWJ8KEwUe7MCcqaZj72olx85jq6kQd7tU",
    authDomain: "image-generation-app-ce29e.firebaseapp.com",
    projectId: "image-generation-app-ce29e",
    databaseURL: "https://image-generation-app-ce29e-default-rtdb.firebaseio.com/",
    storageBucket: "image-generation-app-ce29e.appspot.com",
    messagingSenderId: "485985258036",
    appId: "1:485985258036:web:fe5d5815e0aca2cd67d861",
    measurementId: "G-BEJHMV34BD"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

export { app, auth, database };

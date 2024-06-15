import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyClUCg_PbnuBYFDUPuJDMLD2sRIRd9iRos",
    authDomain: "login-with-firebase-data-fd79f.firebaseapp.com",
    databaseURL: "https://login-with-firebase-data-fd79f-default-rtdb.firebaseio.com",
    projectId: "login-with-firebase-data-fd79f",
    storageBucket: "login-with-firebase-data-fd79f.appspot.com",
    messagingSenderId: "552865752776",
    appId: "1:552865752776:web:8ea82ad0021f9713f727fd",
    measurementId: "G-LJZ0QENKXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        })
})


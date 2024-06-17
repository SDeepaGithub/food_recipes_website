import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyA1S-f8DHBrQn67rK9EQC9ZdlkObOJtl_Q",
    authDomain: "foodreceipebydpa.firebaseapp.com",
    projectId: "foodreceipebydpa",
    storageBucket: "foodreceipebydpa.appspot.com",
    messagingSenderId: "236212671805",
    appId: "1:236212671805:web:01f5991edbff6664382154",
    measurementId: "G-BS8FEP5Y2S"
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


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const firebaseApp = initializeApp(firebaseConfig);
const auth1 = getAuth(firebaseApp);
const auth2 = getAuth(firebaseApp);
const database = getDatabase();

document.getElementById('registerButton').onclick = function () {
    console.log("Register button clicked");
    event.preventDefault();
    registerUser();
};

document.getElementById('submitSignIn').onclick = function () {
    console.log("Sign in button clicked");
    event.preventDefault();
    login();
};

function registerUser() {
    var email = document.getElementById("rEmail").value;
    var password = document.getElementById("rPassword").value;

    console.log("Registering user with email:", email);

    // validate input
    if (!validateEmail(email) || !validatePassword(password)) {
        alert("Email or password is invalid");
        return;
    }

    // Proceed with authentication
    createUserWithEmailAndPassword(auth1, email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            var databaseRef = ref(database, 'users/' + user.uid); // Correct way to get reference
            var userData = {
                email: email,
            };
            console.log("Account created successfully for user:", user.uid);
            showMessage('Account Created Successfully', 'signUpMessage');
            alert("Account Created");
            set(databaseRef, userData); // Correct way to set data
            window.location.href = 'index.html';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorMessage);
            // Handle specific errors
            if (errorCode === 'auth/invalid-email') {
                alert('Invalid email address.');
            } else if (errorCode === 'auth/user-disabled') {
                alert('User account has been disabled.');
            } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                alert('Invalid email or password.');
            } else {
                alert(errorMessage);
            }
        });
}

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log("Logging in user with email:", email);

    // validate input
    if (!validateEmail(email) || !validatePassword(password)) {
        alert("Email or password is invalid");
        return;
    }

    // Sign in with Firebase Authentication
    signInWithEmailAndPassword(auth2, email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            var databaseRef = ref(database, 'users/' + user.uid); // Correct way to get reference
            var userData = {
                last_login: Date.now()
            };
            console.log("User logged in successfully:", user.uid);
            showMessage('Login is successful', 'signInMessage');
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'foodReceipe.html';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorMessage);

            // Handle specific errors
            if (errorCode === 'auth/invalid-email') {
                alert('Invalid email address.');
            } else if (errorCode === 'auth/user-disabled') {
                alert('User account has been disabled.');
            } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                alert('Invalid email or password.');
            } else {
                alert(errorMessage);
            }
        });
}

function validateEmail(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showMessage(message, elementId) {
    var messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.innerText = message;
    }
}

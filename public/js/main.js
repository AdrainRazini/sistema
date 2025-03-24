import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
  

import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAwgWr5YiF9AHFqELcumQUf2tbLSDllTVY",
    authDomain: "login-4a2eb.firebaseapp.com",
    projectId: "login-4a2eb",
    storageBucket: "login-4a2eb.firebasestorage.app",
    messagingSenderId: "515123551208",
    appId: "1:515123551208:web:99cd4d8cd241eb0aa3225d",
    measurementId: "G-D9JHW7EDG1"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

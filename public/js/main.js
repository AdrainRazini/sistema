import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAwgWr5YiF9AHFqELcumQUf2tbLSDllTVY",
  authDomain: "login-4a2eb.firebaseapp.com",
  projectId: "login-4a2eb",
  storageBucket: "login-4a2eb.firebasestorage.app",
  messagingSenderId: "515123551208",
  appId: "1:515123551208:web:99cd4d8cd241eb0aa3225d",
  measurementId: "G-D9JHW7EDG1"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Evento do botão de login
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const userInfo = document.getElementById("user-info");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        userInfo.innerText = `Bem-vindo, ${user.displayName}!`;
      } catch (error) {
        console.error("Erro no login:", error);
      }
    });
  }
});

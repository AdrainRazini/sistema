/* Script Da Central */

// script.js - Gerenciamento Global do Site
import { loginWithGoogle } from './main.js';  // Importando a função do main.js

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script carregado com sucesso!");

    // Ativar o link do menu correto na navegação
    ativarLinkMenu();

    // Verificar se há um formulário de login na página
    if (document.getElementById("login-form")) {
        configurarLogin();
    }

    // Se o usuário já estiver logado, exibe as informações no painel da central
    if (localStorage.getItem("username") && localStorage.getItem("useremail")) {
        document.getElementById("user-name").innerText = localStorage.getItem("username");
        document.getElementById("user-email").innerText = localStorage.getItem("useremail");
        const userPhoto = localStorage.getItem("userphoto");
        if (userPhoto) {
            document.getElementById("user-avatar").src = userPhoto; // Exibindo foto
        }
    }
});

/**
 * Função para destacar o link ativo no menu de navegação
 */
function ativarLinkMenu() {
    let links = document.querySelectorAll("nav a");
    let currentURL = window.location.href;

    links.forEach(link => {
        if (link.href === currentURL) {
            link.classList.add("active"); // Adiciona classe ao link ativo
        }
    });
}

/**
 * Configuração do sistema de login com Firebase (Google)
 */
function configurarLogin() {
    let loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio do formulário

        // Chama a função de login com Google
        loginWithGoogle().then(() => {
            // Após o login bem-sucedido, redireciona para a central do usuário
            window.location.href = 'user-dashboard.html';
        }).catch((error) => {
            console.error("Erro ao realizar o login:", error);
            alert("Erro ao tentar fazer login com o Google.");
        });
    });
}

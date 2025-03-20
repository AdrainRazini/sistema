/*  Script Da Central  */

// script.js - Gerenciamento Global do Site

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script carregado com sucesso!");

    // Ativar o link do menu correto na navegação
    ativarLinkMenu();

    // Verificar se há um formulário de login na página
    if (document.getElementById("login-form")) {
        configurarLogin();
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
 * Configuração do sistema de login (simplesmente valida campos)
 */
function configurarLogin() {
    let loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio do formulário

        let email = document.getElementById("email").value.trim();
        let senha = document.getElementById("senha").value.trim();

        if (email === "" || senha === "") {
            alert("Preencha todos os campos!");
            return;
        }

        console.log("Login enviado:", { email, senha });

        // Simulação de login (substitua pela lógica real)
        if (email === "admin@email.com" && senha === "123456") {
            alert("Login bem-sucedido!");
            window.location.href = "user-dashboard.html"; // Redireciona
        } else {
            alert("Credenciais inválidas!");
        }
    });
}

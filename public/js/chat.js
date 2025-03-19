const socket = io();

// Verifica se o usuário já está logado
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'login.html';
    } else {
        socket.emit('login', username);
    }
});

// Atualiza a lista de usuários online
socket.on('updateUserList', (users) => {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ""; // Limpa a lista
    users.forEach(user => {
        userList.innerHTML += `<li>${user}</li>`;
    });
});

// Exibir mensagens do chat
socket.on('message', (msg) => {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Enviar mensagem
function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chatMessage', message);
        messageInput.value = '';
    }
}

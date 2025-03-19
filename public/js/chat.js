// public/chat.js
const socket = io();

document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');
  if (!username) {
    window.location.href = 'login.html';
  } else {
    socket.emit('login', username);
  }
});

socket.on('userConnected', (username) => {
  document.getElementById('chat-box').innerHTML += `<p><strong>${username} entrou no chat.</strong></p>`;
});

socket.on('message', (msg) => {
  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
});

socket.on('userDisconnected', (username) => {
  document.getElementById('chat-box').innerHTML += `<p><em>${username} saiu do chat.</em></p>`;
});

function sendMessage() {
  const messageInput = document.getElementById('message');
  const message = messageInput.value;
  if (message) {
    socket.emit('chatMessage', message);
    messageInput.value = '';
  }
}
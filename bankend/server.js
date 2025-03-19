// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = [];

io.on("connection", (socket) => {
    socket.on("login", (username) => {
        users.push({ id: socket.id, name: username, online: true });
        io.emit("updateUserList", users);
    });

    socket.on("disconnect", () => {
        const index = users.findIndex(user => user.id === socket.id);
        if (index !== -1) {
            users.splice(index, 1);
            io.emit("updateUserList", users);
        }
    });
});

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log(`Novo usuário conectado: ${socket.id}`);

    // Quando um usuário faz login
    socket.on('login', (username) => {
        users[socket.id] = username;
        io.emit('updateUserList', Object.values(users)); // Envia a lista de usuários online
    });

    // Mensagens do chat
    socket.on('chatMessage', (message) => {
        const username = users[socket.id];
        if (username) {
            io.emit('message', { user: username, text: message });
        }
    });

    // Quando um usuário se desconecta
    socket.on('disconnect', () => {
        const username = users[socket.id];
        delete users[socket.id];
        io.emit('updateUserList', Object.values(users)); // Atualiza a lista de usuários online
        console.log(`Usuário desconectado: ${socket.id}`);
    });
});

// Inicia o servidor
server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

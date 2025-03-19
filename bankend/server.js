const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = {}; // Usa um objeto para armazenar usuários

app.use(express.static('public'));

io.on("connection", (socket) => {
    console.log(`Novo usuário conectado: ${socket.id}`);

    // Quando um usuário faz login
    socket.on("login", (username) => {
        users[socket.id] = { id: socket.id, name: username, online: true };
        io.emit("updateUserList", Object.values(users)); // Envia a lista de usuários online
    });

    // Mensagens do chat
    socket.on("chatMessage", (message) => {
        const user = users[socket.id];
        if (user) {
            io.emit("message", { user: user.name, text: message });
        }
    });

    // Quando um usuário se desconecta
    socket.on("disconnect", () => {
        if (users[socket.id]) {
            delete users[socket.id]; // Remove o usuário
            io.emit("updateUserList", Object.values(users)); // Atualiza a lista de usuários online
        }
        console.log(`Usuário desconectado: ${socket.id}`);
    });
});

// Inicia o servidor
server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

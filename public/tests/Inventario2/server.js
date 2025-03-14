const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Configurações do JSONBin.io
const BIN_ID = '678fddc7ad19ca34f8f22263'; // Substitua com o ID do seu JSONBin
const JSONBIN_API_KEY = '$2a$10$OxZDEgxeC5Y.h/kAtkCfles8WgToULyKdtyioyVQyBms4eLWjJkJu'; // Substitua com sua API Key do JSONBin
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Middleware para tratamento de erros
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Servir arquivos estáticos da pasta atual
app.use(express.static('public'));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

// Rota para obter o inventário completo
app.get('/inventario', async (req, res) => {
    try {
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        res.json(response.data.record); // Retorna o inventário completo
    } catch (err) {
        res.status(500).send('Erro ao acessar o inventário.');
    }
});

// Rota para adicionar novo item
app.post('/adicionar', async (req, res) => {
    try {
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        const inventario = response.data.record;

        const novoItem = {
            id: inventario.length > 0 ? inventario[inventario.length - 1].id + 1 : 1, // Gera um novo ID
            transportadora: req.body.transportadora,
            cliente: req.body.cliente,
            itens: req.body.itens,
            valor_total_declarado: req.body.valor_total_declarado,
            observacao: req.body.observacao,
            data_local: req.body.data_local,
            assinaturas: req.body.assinaturas
        };

        inventario.push(novoItem); // Adiciona o novo item
        await axios.put(JSONBIN_URL, inventario, {
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        res.status(201).send(novoItem); // Retorna o novo item adicionado
    } catch (err) {
        res.status(500).send('Erro ao adicionar novo item.');
    }
});

// Rota para deletar um item
app.delete('/deletar/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        const inventario = response.data.record;

        const index = inventario.findIndex(item => item.id === id); // Encontra o índice do item pelo ID
        if (index === -1) {
            return res.status(404).send('Item não encontrado');
        }
        const itemRemovido = inventario[index]; // Guarda o item que será removido
        inventario.splice(index, 1); // Remove o item

        await axios.put(JSONBIN_URL, inventario, {
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        res.json({ message: 'Item deletado', item: itemRemovido }); // Retorna o item removido
    } catch (err) {
        res.status(500).send('Erro ao deletar item.');
    }
});

// Middleware de tratamento de erros
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
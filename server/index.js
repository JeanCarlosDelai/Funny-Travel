// Importa o modulo do Express
const express = require('express');

// Cria uma aplicação Express
const app = express();

//A configuração do CORS permite que a sua aplicação Node.js aceite solicitações de diferentes origens
const cors = require('cors'); app.use(cors());

// Importando MongoClient para conectar ao banco de dados
// Importando ObjectId para manipular documentos com identificadores únicos
const { MongoClient, ObjectId } = require('mongodb');

// Usado para enviar ou receber dados JSON em uma requisição HTTP.
app.use(express.json());
// Usado para analisar o corpo das requisições HTTP 
app.use(express.urlencoded({ extended: true }));

//Conexão com o banco de dados
const uri = 'mongodb+srv://admin:admin@clustersteam.sul8w7v.mongodb.net/test';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Método GET que retorna todos os objetos do banco de dados
app.get('/jogos', async (req, res) => {
    try {
        const collection = client.db('bancoSteam').collection('jogos');
        const data = await collection.find().toArray();
        const accounts = data.map(account => ({
            _id: account._id,
            name: account.name,
            categoria: account.categoria,
            imagem: account.imagem,
            description: account.description,
        }));
        res.json(accounts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
});

// Método GET para retornar um usuário pelo ID
app.get('/jogos/:_id', async (req, res) => {
    try {
        const collection = client.db('bancoSteam').collection('jogos');
        const account = await collection.findOne({ _id: new ObjectId(req.params._id) });
        if (!account) {
            res.status(404).send('Usuário não encontrado');
            return;
        }
        const { _id, name, categoria, imagem } = account;
        res.json({ _id, name, categoria, imagem });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
});

//Método para adicionar novos jogos
app.post('/jogos', async (req, res) => {
    try {
        const collection = client.db('bancoSteam').collection('jogos');
        const result = await collection.insertOne(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao adicionar jogo ao banco de dados');
    }
});
//Método para apagar um jogo
app.delete('/jogos/:_id', async (req, res) => {
    try {
        const collection = client.db('bancoSteam').collection('jogos');
        const result = await collection.deleteOne({ _id: new ObjectId(req.params._id) });
        res.json(result);
    } catch (err) {
        console.error(err);
    }
});

// Inicia o servidor na porta '3000'
app.listen(3000, () => {
    // imprime um comentário de log no console
    console.log("Exemplo operando na porta 3000");
});

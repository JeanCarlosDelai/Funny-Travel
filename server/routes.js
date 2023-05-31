// Importando as dependências do projeto
const express = require("express");

// Referencia ao db.js
const db = require("./db");

const authenticateJWT = require("./auth");
// O objeto routes é uma instância da classe Router fornecida pelo Express.
// Ele permite definir rotas e lógica de manipulação de solicitações HTTP específicas para esse roteador.
const routes = express.Router();

//Rotas para os jogos
routes.get("/jogos", db.selectJogos);
routes.post("/jogos", db.insertJogo);
routes.delete("/jogos/:id", db.deleteJogo);

//Rotas para login
// routes.post("/login", db.cadastrarUsuario);
routes.post("/login", db.logar);
routes.get("/showUser", db.listarUsuarios);

//Cadastro Usuários
routes.post("/cadastro", db.cadastrarUsuario);

module.exports = routes;

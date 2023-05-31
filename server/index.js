// Importa o modulo do Express
const express = require("express");

// Cria uma aplicação Express
const app = express();

//A configuração do CORS permite que a sua aplicação Node.js aceite solicitações de diferentes origens
const cors = require("cors");
app.use(cors());

const mysql2 = require("mysql2");

// Usado para enviar ou receber dados JSON em uma requisição HTTP.
app.use(express.json());

// Usado para analisar o corpo das requisições HTTP
app.use(express.urlencoded({ extended: true }));

// Redireciona o caminho http://localhost:3000/ para o routes
app.use("/", require("./routes"));

// Inicia o servidor na porta '3000'
app.listen(3000, () => {
  // imprime um comentário de log no console
  console.log("Exemplo operando na porta 3000");
});

// Importa o modulo do Express
const express = require("express");

// Cria uma aplicação Express
const app = express();

// Importando as dependências
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// Certifique-se de substituir 'user' e 'password' pelos valores corretos
const con = mysql.createConnection({
  host: "localhost",
  database: "bancoSteam",
  user: "root",
  password: "",
});

//Informação de conexão ao banco de dados
con.connect((err) => {
  //Como vamos receber um erro, o err passa e ter alguma informação, assim entrando no if.
  if (err) {
    console.log("Erro ao conectar ao banco de dados");
    return;
  }
  // Pra conexão ser estabelecida, não pode dar nenhum erro
  // Se não der erro na conexão, o err vai ser null, e null é considerado falso
  console.log("Conexão estabelecida");
});

// Vamos exportar um objeto com algumas funções
module.exports = {
  // Vai retornar todos os jogos de nosso banco de dados
  async selectJogos(req, res) {
    con.query("SELECT * FROM jogos", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  },

  // Vai inserir um jogo
  async insertJogo(req, res) {
    // const { role } = req.user;
    const jogo = req.body;
    // if (role !== "admin") {
    //   return res.sendStatus(403);
    // } else {
    con.query("INSERT INTO jogos SET ?", jogo, (err, results) => {
      if (err) throw err;
      console.log("Last insert ID:", results.insertId);
      res.json(results);
    });
    // }
  },

  //  Vai excluir um jogo
  async deleteJogo(req, res) {
    // const { role } = req.user;
    const id = req.params.id;
    // if (role !== "admin") {
    //   return res.sendStatus(403);
    // } else {
    con.query("DELETE FROM jogos WHERE id = ?", id, (err, results) => {
      if (err) throw err;
      console.log(`Deleted ${results.affectedRows} row(s)`);
      res.json(results);
    });
    // }
  },

  //Login
  async cadastrarUsuario(req, res) {
    const usuario = req.body;
    con.query("INSERT INTO login SET ?", usuario, (err, results) => {
      if (err) throw err;
      console.log("Last insert ID:", results.insertId);
      res.json(results);
    });
  },

  //Login

  async logar(req, res) {
    const { name, password } = req.body;

    // Execute a consulta SQL para buscar o usuário no banco de dados
    con.query(
      "SELECT * FROM login WHERE name = ? AND password = ?",
      [name, password],
      (error, results) => {
        if (error) {
          // Trate qualquer erro de consulta
          console.error(error);
          return res.status(500).json({ message: "Erro ao acessar jogos" });
        }

        if (results.length > 0) {
          const user = results[0];

          // Verifica as credenciais
          if (verificarCredenciais(user, password)) {
            // Gera um token de acesso
            const accessToken = jwt.sign(
              { name: user.name, role: user.role },
              accessTokenSecret
            );
            console.log(accessToken);
            res.json({
              accessToken,
              user,
            });
          } else {
            res.status(401).send("Nome de usuário ou senha incorretos");
          }
        } else {
          // O usuário não foi encontrado no banco de dados
          res.status(401).send("Nome de usuário ou senha incorretos");
        }
      }
    );
    function verificarCredenciais(user, password) {
      // Realize a verificação das credenciais aqui
      return user.password === password;
    }
  },

  async listarUsuarios(req, res) {
    // const { role } = req.user;
    // if (role !== "admin") {
    //   return res.sendStatus(403);
    // } else {
    con.query("SELECT * FROM login", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
    // }
  },
};

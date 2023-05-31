// Importa o modulo do Express
const express = require("express");

// Cria uma aplicação Express
const app = express();

const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

module.exports = authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
    console.log(authHeader);
  }
};

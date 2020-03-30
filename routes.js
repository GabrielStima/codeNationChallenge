const express = require("express");
const routes = express.Router();
const CodeChallenge = require("./controllers/CodeChallenge");

routes.get("/", CodeChallenge.execute);

module.exports = routes;

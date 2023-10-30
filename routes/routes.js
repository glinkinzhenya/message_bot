const express = require("express");
const {sendMessage} = require('../controler/controler')

const routes = express.Router();

routes.post("/", sendMessage);

module.exports = routes;
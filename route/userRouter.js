const express = require("express");
const authController = require("../controller/authController");

const Router = express.Router();

Router.route("/login").post(authController.login);
Router.route("/signup").post(authController.signUp);

module.exports = Router;
const express = require("express");
const authController = require("../controller/authController");
const postsController = require("../controller/postsController");


const Router = express.Router();

Router.route("/login").post(authController.login);
Router.route("/signup").post(authController.signUp);
Router.route("/posts").get(authController.checkToken, postsController.getUserPosts);


module.exports = Router;
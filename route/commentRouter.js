const express = require("express");
const commentController = require("../controller/commentsController");
const authController = require("../controller/authController");

const Router = express.Router();

Router.route("/:id")
  .get(commentController.getComment)
  .delete(authController.checkToken, commentController.deleteComment)
  .post(authController.checkToken, commentController.createComment)
  .put(authController.checkToken, commentController.updateComment);
  
module.exports = Router;

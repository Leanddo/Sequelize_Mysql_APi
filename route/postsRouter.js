const express = require("express");
const authController = require("../controller/authController");
const postsController = require("../controller/postsController");

const Router = express.Router();

Router.route("/")
  .post(authController.checkToken, postsController.createPost)
  .get(postsController.getPosts);

Router.route("/:id")
  .get(postsController.getPostsId)
  .delete(authController.checkToken, postsController.deletePost)
  .put(authController.checkToken, postsController.updatePost);

module.exports = Router;

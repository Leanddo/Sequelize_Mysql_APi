const { where } = require("sequelize");
const { Posts, User } = require("../model/social");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error post not found" });
  }
};

exports.getPostsId = async (req, res) => {
  const post_id = req.params.id;
  try {
    const posts = await Posts.findOne({
      include: [
        {
          model: User,
          attributes: ["username"],
          required: true,
        },
      ],
      where: {
        post_id: post_id,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error post not found" });
  }
};

exports.createPost = async (req, res) => {
  const { private, content } = req.body;
  const user_id = req.user.user_id;
  console.log(user_id);
  try {
    const createPost = await Posts.create({
      content,
      user_id,
      private,
    });
    res
      .status(201)
      .json({ message: "Post was created with success", createPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    console.log(user_id);

    const posts = await Posts.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error post not found" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const post_user_id = await Posts.findOne({
      attributes: ["user_id"],
      where: {
        post_id: post_id,
      },
    });

    if (req.user.user_id == post_user_id.dataValues.user_id) {
      await Posts.destroy({
        where: {
          post_id: post_id
        },
      });
      return res.status(204).json({message: "Deleted with success"});
    }else{
      return res.status(403).json({ message: "Unauthorized action" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error post not found" });
  }
};

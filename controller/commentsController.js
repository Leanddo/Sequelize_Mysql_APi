const { Posts, User, Comments } = require("../model/social");

exports.createComment = async (req, res) => {
  const { post_id, comment_text } = req.body;
  const user_id = req.user.user_id;
  console.log(user_id);
  try {
    const createComment = await Comments.create({
      post_id,
      user_id,
      comment_text,
    });
    res
      .status(201)
      .json({ message: "Post was created with success", createPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getComments = async (req, res) => {};

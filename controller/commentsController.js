const { Posts, User, Comments } = require("../model/social");

exports.createComment = async (req, res) => {
  const { comment_text } = req.body;
  const user_id = req.user.user_id;
  const post_id = req.params.id;
  console.log(user_id);
  try {
    const createComment = await Comments.create({
      post_id,
      user_id,
      comment_text,
    });
    res
      .status(201)
      .json({ message: "Post was created with success", createComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getComment = async (req, res) => {
  const comment_id = req.params.id;

  try {
    const getComments = await Comments.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
          required: true,
        },
      ],
      where: {
        comment_id: comment_id,
      },
    });
    res.status(200).json(getComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment_id = req.params.id;
    const post_user_id = await Comments.findOne({
      attributes: ["user_id"],
      where: {
        comment_id: comment_id,
      },
    });

    if (req.user.user_id == post_user_id.dataValues.user_id) {
      await Comments.destroy({
        where: {
          comment_id: comment_id,
        },
      });
      return res.status(204).json({ message: "Deleted with success" });
    } else {
      return res.status(403).json({ message: "Unauthorized action" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error post not found" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment_id = req.params.id;
    const { comment_text } = req.body;
    const post_user_id = await Comments.findOne({
      attributes: ["user_id"],
      where: {
        comment_id: comment_id,
      },
    });

    if (req.user.user_id == post_user_id.dataValues.user_id) {
      await Comments.update(
        {comment_text:comment_text},
        {
          where: {
            comment_id: comment_id,
          },
        }
      );
      return res.status(204).json({ message: "Deleted with success" });
    } else {
      return res.status(403).json({ message: "Unauthorized action" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error post not found" });
  }
};

const { Posts } = require("../model/social");

exports.getposts = async (req, res) => {

    try {
        const posts = Posts.findAll();
    } catch (error) {
        
    }
};

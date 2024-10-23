const { Comments, User, Posts } = require("../model/social");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "sºdnfº+oindfSsf";

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const hashpassword = bcrypt.hashSync(password, 10);
  try {
    const createdUser = await User.create({
      username,
      email,
      hashpassword,
    });
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { password, email } = req.body;

  try {
    if (!password || !username) {
      return res
        .status(400)
        .json({ message: "incorrect username or password" });
    }
    const hashpassword = await User.findAll({
      where: {
        email: email,
      },
    });
    if (bcrypt.compare(password, hashpassword)) {
      jwt.sign(email, secret, { expiresIn: "1w" }, (err, token) => {
        if (err) {
          console.error("Error generating JWT token", err);
        }
        res.json(token);
      });
    } else {
      res.status(401).json({ message: "Incorrect password or email" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.checkToken = (req, res) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    console.log("Extrated token: ", token);

    if (!token) {
      res.status(401).json({ message: "Authentication required." });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Invalid token" });
        return;
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(403).json({ message: "No token provided" });
  }
};

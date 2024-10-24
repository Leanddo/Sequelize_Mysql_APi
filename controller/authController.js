const { User } = require("../model/social");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "sºdnfº+oindfSsf";

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedpassword = bcrypt.hashSync(password, 10);
    const createdUser = await User.create({
      username,
      email,
      password_hash: hashedpassword,
    });
    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { password, email } = req.body;

  try {

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!password || !email || !user) {
      return res
        .status(400)
        .json({ message: "incorrect username or email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (isPasswordValid) {
      jwt.sign({email:user.email}, secret, { expiresIn: "1w" }, (err, token) => {
        if (err) {
          console.error("Error generating JWT token", err);
        }

        res.json({token});
      });
    } else {
      res.status(401).json({ message: "Incorrect password or email" });
    }
  } catch (error) {
    console.log(error);
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
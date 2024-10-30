const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./config/database");

const UserRoutes = require("./route/userRouter");
const PostsRoutes = require("./route/postsRouter");
const CommentsRoutes = require("./route/commentRouter");

const app = express();

db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to de database", err));

app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] // Add your allowed methods here
}));
app.use(express.json());

app.use("/api/user", UserRoutes);
app.use("/api/posts", PostsRoutes);
app.use("/api/comments", CommentsRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

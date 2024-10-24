const express = require("express");

const db = require("./config/database");

const UserRoutes = require("./route/userRouter");

const app = express();

db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to de database", err));

app.use(express.json());

app.use("/api/user", UserRoutes);
const port = 3000;
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})
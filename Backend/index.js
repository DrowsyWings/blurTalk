const express = require("express");
const connectDB = require("./db/config");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
//const postRoutes = require("./routes/postRoutes");
// const pollRoutes = require("./routes/pollRoutes");
// const chatRoutes = require("./routes/chatRoutes");

dotenv.config();

connectDB();

const app = express();

app.use("/*", cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
//app.use("/api/post", postRoutes);
// app.use("/api/poll", pollRoutes);
// app.use("/api/chats", chatRoutes);

app.listen(3000);

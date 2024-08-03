const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://real-time-chat-app-backend-a5up.onrender.com',
  credentials: true
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.mongoDB_URL)
  .then(() => {
    console.log("Database connection successful!");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.log("Connection failed: ", err.message);
  });
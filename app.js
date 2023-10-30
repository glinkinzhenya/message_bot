
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const token = process.env.token



const bot = new TelegramBot(token, { polling: true });
const chatId = process.env.chatId

// bot.on("message", (msg) => {
//   lastChatId = msg.chat.id;
//   // bot.sendMessage(lastChatId, "I'm ready ");
// });

const sendMessage = (req, res) => {
  // if (!lastChatId) {
  //   return res.status(400).json({
  //     message: "No chat ID available",
  //   });
  // }

  const data = req.body;
  function formatJson(jsonData) {
    return Object.entries(jsonData)
      .map(([key, value]) => {
        if (key === "----------") {
          return `${key}: ${value}`;
        }
        return `${key}: ${value ? value : "м"}`;
      })
      .join("\n");
  }

  const formattedData = formatJson(data);

  bot.sendMessage(chatId, formattedData);

  res.status(200).json({
    message: "OK",
  });
};

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.post("/send", sendMessage);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
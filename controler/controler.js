const { ctrlWrap } = require("../decorators/ctrlWrap")
const TelegramBot = require("node-telegram-bot-api");

const token = "6909424611:AAHvIG_g7pxEI9n57rvKkVXvlYn4GbUAC0w";

const bot = new TelegramBot(token, { polling: true });
const chatId = 1002042001106;

const sendMessage = async (req, res) => {
    const data = req.body
    bot.sendMessage(chatId, JSON.stringify(data));
    
    res.status(200).json({
        message: "OK"
    })
} 


module.exports = {
    sendMessage,
}
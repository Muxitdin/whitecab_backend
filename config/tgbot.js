require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);
const chatId = process.env.TELEGRAM_CHAT_ID;

bot.deleteWebHook()
    .then(() => console.log('Webhook deleted'))
    .catch(error => console.error('Error deleting webhook:', error));

async function sendRegistrationData(userData) {
  const message = `Новый пользователь зарегистрирован:\n\nИмя: ${userData.name}\nТелефон: +${userData.phone}`;
  
  bot.sendMessage(chatId, message)
    .then(() => console.log('Сообщение отправлено'))
    .catch(error => {
        console.error('Ошибка отправки сообщения', error);
    });
}

module.exports = {
    sendRegistrationData,
    bot
};
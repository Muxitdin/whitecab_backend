const TelegramBot = require('node-telegram-bot-api');
const token = '6545177490:AAEA9VD7RMAGNhDA0khZ6cJ2FwC8HQENvbg';
const bot = new TelegramBot(token);
const chatId = '2144613960';

bot.setWebHook(`${process.env.SERVER_URL}/api/telegram/bot-path`);

module.exports = async function sendRegistrationData(userData) {
  const message = `Новый пользователь зарегистрирован:\n\nИмя: ${userData.name}\nТелефон: +${userData.phone}`;
  
  bot.sendMessage(chatId, message)
    .then(() => console.log('Сообщение отправлено'))
    .catch(error => console.error('Ошибка отправки сообщения', error));
}

module.exports = bot;
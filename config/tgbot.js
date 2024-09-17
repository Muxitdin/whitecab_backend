const Bottleneck = require('bottleneck');
const TelegramBot = require('node-telegram-bot-api');
const token = '6545177490:AAEA9VD7RMAGNhDA0khZ6cJ2FwC8HQENvbg';
const bot = new TelegramBot(token);
const chatId = '2144613960';

bot.setWebHook(`${process.env.SERVER_URL}/api/telegram/bot-path`);

const limiter = new Bottleneck({
    minTime: 1000  // Минимальное время между запросами (1 секунда)
});

const sendMessage = limiter.wrap((chatId, message) => {
    return bot.sendMessage(chatId, message);
});

async function sendRegistrationData(userData) {
  const message = `Новый пользователь зарегистрирован:\n\nИмя: ${userData.name}\nТелефон: +${userData.phone}`;
  
  sendMessage(chatId, message)
    .then(() => console.log('Сообщение отправлено'))
    .catch(error => {
        if (error.response && error.response.body && error.response.body.parameters) {
            const retryAfter = error.response.body.parameters.retry_after;
            console.log(`Повторная попытка через ${retryAfter} секунд`);
            setTimeout(() => sendMessage(chatId, message), retryAfter * 1000);
        } else {
            console.error('Ошибка отправки сообщения', error);
        }
    });
}

module.exports = {
    sendRegistrationData,
    bot
};
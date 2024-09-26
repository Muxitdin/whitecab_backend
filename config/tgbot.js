const { Telegraf } = require('telegraf')
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const bot = new Telegraf(token);
const WEBHOOK_URL = process.env.SERVER_URL
bot.telegram.setWebhook(`${WEBHOOK_URL}/bot${process.env.TELEGRAM_BOT_TOKEN}`);

bot.start((ctx) => {
    ctx.reply("Добро пожаловать! Если вы являетесь админом, то отсюда вы можете получать уведомления о новых регистрациях на платформе www.whitecab.uz .")
})

bot.hears(/.+/, (ctx) => {
    ctx.reply("Данный бот не предназначен для прямого общения, однако, если у вас возникли вопросы или потребуется помощь, пожалуйста, свяжитесь со службой поддержки. @cnqrorxd ");
});

async function sendRegistrationData(userData) {
    const message = `Новый пользователь зарегистрирован:\n\nИмя: ${userData.name}\nТелефон: +${userData.phone}`;

    await bot.telegram.sendMessage(chatId, message)
        .then(() => console.log('Сообщение отправлено'))
        .catch(error => {
            console.error('Ошибка отправки сообщения', error);
        });
}

module.exports = {
    sendRegistrationData,
    bot
};
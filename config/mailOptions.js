const dotenv = require('dotenv')
dotenv.config()

module.exports = function (mailTitle, mailText) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: mailTitle,
        html: mailText
    };

    return mailOptions;
};
const checkTranfporterWork = require("./checkTransporterWork.js")
const transporter = require("./transporter.js");
const mailOptions = require("./mailOptions.js");

module.exports = async function ({ phonenumber, fullname }) {
    checkTranfporterWork();

    const mailTitle = 'Поступил запрос от нового пользователя'
    const mailText = `<p>
            Номер телефона: +${phonenumber} <br />
            Имя: ${fullname} <br />
        </p>`

    transporter.sendMail(mailOptions(mailTitle, mailText), function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
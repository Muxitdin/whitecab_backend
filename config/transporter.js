const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

module.exports = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})
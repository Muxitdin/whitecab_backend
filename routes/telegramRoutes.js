const express = require('express')
const bot = require('../config/tgbot.js')
const router = express.Router()

router.post('/bot-path', (req, res) => {
    bot.processUpdate(req.body)
    res.sendStatus(200)
})

module.exports = router;
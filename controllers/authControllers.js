const sendMail = require('../config/sendMail.js')
const Auth = require("../models/Auth.js")
const generateToken = require('../services/Token.js')

const getAuth = async (req, res) => {
    try {
        const foundAuth = await Auth.findById(req.authId)
        if (!foundAuth) return res.status(404).json("Нет такого пользователя")
        res.status(200).json({ user: foundAuth })
    } catch (error) {
        res.status(500).json({ msg: error })
        console.log(error)
    }
}

const register = async (req, res) => {
    try {
        const { firstname, lastname, phonenumber, agreement } = req.body
        const result = '998' + String(phonenumber)
        const formattedNumber = parseInt(result)
        console.log(firstname, lastname, phonenumber, agreement)
        console.log(formattedNumber)

        const user = await Auth.findOne({ phonenumber: formattedNumber })
        if (user) return res.status(400).json({ msg: "Пользователь с таким номером телефона уже существует" })

        const newUser = await Auth.create({ firstname, lastname, phonenumber: formattedNumber, agreement })
        console.log("🚀 ~ register ~ newUser:", newUser)
        sendMail({ phonenumber: formattedNumber, fullname: firstname + " " + lastname })
        res.status(201).json({ msg: "Пользователь зарегистрирован успешно", user: newUser })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const login = async (req, res) => {
    try {
        const { phonenumber } = req.body
        const formattedNumber = 998 + phonenumber

        const user = await Auth.findOne({ phonenumber: formattedNumber })
        console.log("🚀 ~ login ~ user:", user)

        if (!user) return res.status(400).json({ msg: "Пользователь с таким номером телефона не найден" })

        const token = generateToken(user._id)

        res.status(200).json({ msg: "Пользователь успешно авторизован", user, token })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAuth,
    register,
    login
}
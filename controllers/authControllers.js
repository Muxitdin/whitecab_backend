import Auth from "../models/Auth.js"
import bcrypt from "bcrypt"
import validatePassword from '../services/validatePassword.js'
import generateToken from '../services/Token.js'

export const getAuth = async (req, res) => {
    try {
        const foundAuth = await Auth.findById(req.authId)
        if (!foundAuth) return res.status(404).json("Нет такого пользователя")
        res.status(200).json({ user: foundAuth })
    } catch (error) {
        res.status(500).json({ msg: error })
        console.log(error)
    }
}

export const register = async (req, res) => {
    try {
        const { firstname, lastname, phonenumber, password, agreement } = req.body
        const formattedNumber = 998 + phonenumber
        console.log(firstname, lastname, phonenumber, password, agreement)
        console.log(formattedNumber)

        const user = await Auth.findOne({ phonenumber: formattedNumber })
        if (user) return res.status(400).json({ msg: "Пользователь с таким номером телефона уже существует" })

        const result = validatePassword(password)
        if (!result.valid) return res.status(400).json({ msg: result.errors[0] })

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await Auth.create({ firstname, lastname, phonenumber: formattedNumber, password: hashedPassword, agreement })
        res.status(201).json({ msg: "Пользователь зарегистрирован успешно", user: newUser })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export const login = async (req, res) => {
    try {
        const { phonenumber, password } = req.body
        const formattedNumber = 998 + phonenumber
        console.log("🚀 ~ login ~ password:", password)
        console.log("🚀 ~ login ~ phonenumber:", phonenumber)
        console.log("🚀 ~ login ~ formattedNumber:", formattedNumber)

        const user = await Auth.findOne({ phonenumber: formattedNumber })
        console.log("🚀 ~ login ~ user:", user)

        if (!user) return res.status(400).json({ msg: "Пользователь с таким номером телефона не найден" })

        const isPassEqual = await bcrypt.compare(password, user.password)
        console.log("🚀 ~ login ~ isPassEqual:", isPassEqual)
        if (!isPassEqual) return res.status(400).json({ msg: "Неверный пароль" })

        const token = generateToken(user._id)

        res.status(200).json({ msg: "Пользователь успешно авторизован", user, token })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
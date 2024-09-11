import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import auth from "./routes/authRoutes.js"
import mongoose from 'mongoose'

dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use(urlencoded({ extended: true }))

// Built in middleware
app.use(express.static('public'))

// Third party middleware
app.use(helmet())
if (app.get('env') === 'development') {
    app.use(cors())
};

app.use('/api/auth', auth)

// Asosiy route
app.get('/', (_, res) => {
    res.send("Main page")
})


const port = process.env.PORT || 5000

const runCode = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`http://localhost:${port}/`)
        })
    } catch (error) {
        console.log(error)
    }
}

runCode()
const express = require('express');
const { urlencoded } = express;
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const auth = require('./routes/authRoutes.js');
const mongoose = require('mongoose');

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
    app.use(cors("https://whitecab.uz/"))
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
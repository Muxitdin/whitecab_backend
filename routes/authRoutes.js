const express = require('express')
const { getAuth, register, login } = require('../controllers/authControllers.js')
const authentication = require('../middlewares/authentication.js')
const router = express.Router()

router.get('/', authentication, getAuth)
router.post('/register', register)
router.post('/login', login)

module.exports = router;
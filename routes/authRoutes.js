import express from 'express';
import { getAuth, register, login } from "../controllers/authControllers.js"
import authentication from "../middlewares/authentication.js"
const router = express.Router();

router.get('/', authentication, getAuth)
router.post('/register', register)
router.post('/login', login)

export default router;
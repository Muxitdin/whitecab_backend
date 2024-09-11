import express from 'express';
import { getAuth, register, login } from "../controllers/authControllers.js"
const router = express.Router();

router.post('/', getAuth)
router.post('/register', register)
router.post('/login', login)

export default router;
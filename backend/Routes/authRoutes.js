import express from "express";
import { login, logout, register } from './controllers/authController.js';
import { rateLimitngMiddleware } from "../middlewere/rateLimitingMiddleware.ts";



const router = express.Router();

router.post('/register', register)

router.post('/login',rateLimitngMiddleware, login)

router.post('/logout', logout)

export default router;


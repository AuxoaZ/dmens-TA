import express from "express"
import {
        login,
        registerCustomer,
        logout,
        me
    } from "../controllers/Auth.js"

const router = express.Router();

router.get('/me', me)
router.delete('/logout', logout)
router.post('/login', login) 
router.post('/register', registerCustomer)

export default router;
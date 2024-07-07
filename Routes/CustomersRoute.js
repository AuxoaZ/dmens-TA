import express from "express"
import {
    getCustomers,
    getCustomerById,
    updateCustomer,
    getProfile,
    createProfile,
    updateProfile
    } from "../controllers/Customers.js"
import { verify, admin } from "../middleware/Auth.js";

const router = express.Router();

router.get('/customers', verify, admin, getCustomers)
router.get('/customers/:id', verify, admin, getCustomerById)
router.patch('/customers/:id', verify, admin, updateCustomer)

router.get('/profile/:id', verify, getProfile)
router.post('/profile', verify, createProfile)
router.patch('/profile/:id', verify, updateProfile)

export default router;
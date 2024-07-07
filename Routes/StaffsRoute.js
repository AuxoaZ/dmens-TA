import { verify, managerOnly, admin} from "../middleware/Auth.js";

import express from "express"
import {
    createStaff,
    getStaff,
    getStaffById,
    getAdmins,
    getBarber,
    getCashier,
    updateStaff,
    deleteStaff,
    getStaffProfile,
    updateStaffProfile,
    createStaffProfile
    } from "../controllers/Staff.js"

const router = express.Router();

router.post('/staff', createStaff)
router.get('/staff',verify, admin, getStaff)
router.get('/staff/:id',verify, admin, getStaffById)
router.get('/staff-barber',verify, admin, getBarber)
router.get('/staff-cashier',verify, admin, getCashier)

router.patch('/staff/:id',verify, managerOnly, updateStaff)
router.delete('/staff/:id',verify, managerOnly, deleteStaff)

router.get('/staff_profile/:id',verify, getStaffProfile)
router.post('/staff_profile',verify, createStaffProfile)
router.patch('/staff_profile/:id',verify, updateStaffProfile)

export default router;
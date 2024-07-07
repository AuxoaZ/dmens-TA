import { verify, managerOnly, admin} from "../middleware/Auth.js";

import express from "express"
import {
createBarber,
getBarbers
    } from "../controllers/Barbers.js"

const router = express.Router();

router.post('/barbers', verify, admin, createBarber)
router.get('/barbers', verify, admin, getBarbers)


export default router;
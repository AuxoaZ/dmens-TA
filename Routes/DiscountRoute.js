import { verify, managerOnly, admin} from "../middleware/Auth.js";

import express from "express"
import {
createDiscount
    } from "../controllers/Discounts.js"

const router = express.Router();

router.post('/discounts', verify, admin, createDiscount)
// router.get('/barbers', verify, admin, getBarbers)


export default router;
import { verify, managerOnly, admin} from "../middleware/Auth.js";

import express from "express"
import {
createCashier,
getCashiers
    } from "../controllers/Cashiers.js"

const router = express.Router();

router.post('/cashiers', verify, admin, createCashier)
router.get('/cashiers', verify, admin, getCashiers)


export default router;
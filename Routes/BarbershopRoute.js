import { verify, managerOnly, admin} from "../middleware/Auth.js";

import express from "express"
import {
createBarbershop,
getBarbershopByName
    } from "../controllers/Barbershop.js"

const router = express.Router();

router.post('/barbershop', verify, admin, createBarbershop)
router.get('/barbershop', verify, admin, getBarbershopByName)


export default router;
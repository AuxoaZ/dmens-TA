import express from "express"
const router = express.Router();

import auth from "./AuthRoute.js";
import customers from "./CustomersRoute.js"
import staff from "./StaffsRoute.js"
import barbershop from "./BarbershopRoute.js"
import barbers from "./BarberRoute.js"
import cashiers from "./CashierRoute.js"
import discount from "./DiscountRoute.js"


router.use(auth);
router.use(customers);
router.use(staff);
router.use(barbershop);
router.use(barbers);
router.use(cashiers);
router.use(discount);


export default router;
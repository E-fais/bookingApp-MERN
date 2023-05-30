import { Router } from "express";
import { createBooking, getAllBookings } from "../controllers/booking.js";
import { usreAuth } from "../middleware/user.js";

const router = Router();


router.get("/", usreAuth, getAllBookings);
router.post("/", usreAuth, createBooking);

export default router;

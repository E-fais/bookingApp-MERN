import { Router } from "express";
import { usreAuth } from "../middleware/user.js";
import { createPlace, editPlace, getAllPlaces, getPlace, getUserPlaces } from "../controllers/places.js";
const router = Router();


router.get("/", usreAuth, getAllPlaces);
router.get("/user-places", usreAuth, getUserPlaces);
router.get("/:id", usreAuth, getPlace);
router.post("/", usreAuth, createPlace);
router.put("/", usreAuth, editPlace);

export default router;

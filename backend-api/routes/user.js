import { Router } from "express";
import { getUser, logout, signin, signup } from "../controllers/user.js";
import { usreAuth } from "../middleware/user.js";
const router = Router();


router.post("/signin", signin);
router.post("/signup", signup);

// this is your comment about this route
//route to store user info so that it does not desappear on refresh

// mine: i've refactored this but there is no need at all
// instead of this store user data on localStorage in frontEnd
router.get("/profile", usreAuth, getUser);
// same thing here 
// you can just store user data on your localStorage and remove it for logOut
router.get("/logout", logout);
export default router;
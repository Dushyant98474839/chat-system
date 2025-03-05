import { Router } from "express";
import Authcontroller from "../controllers/Authcontroller.js";
import { verifyToken } from "../middleware/auth.js"; // Import the middleware

const router = Router();

router.post("/signup", Authcontroller.signup);
router.post("/login", Authcontroller.login);

router.get("/profile", verifyToken, Authcontroller.profile);
 // Protect profile route
router.post("/updateProfile", verifyToken, Authcontroller.updateProfile);

                     


export default router;

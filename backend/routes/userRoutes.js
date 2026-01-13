import express from "express";
const router  = express.Router();
import { UserSignin, UserSignup, buyCourse, logout, purchase } from "../controllers/userController.js";
import { userMiddleware } from "../middlewares/user.js";


router.post("/signup", UserSignup);

router.post("/signin", UserSignin);

router.get("/logout", logout);

router.get("/purchases", userMiddleware, purchase);

router.get("/buycourse", userMiddleware, buyCourse);


export default router;
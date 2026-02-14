import express from "express";
const router  = express.Router();
import { UserSignin, UserSignup, buyCourse, logout, purchase, getMe, updateUser } from "../controllers/userController.js";
import { userMiddleware } from "../middlewares/user.js";


router.post("/signup", UserSignup);

router.post("/signin", UserSignin);

router.get("/logout", logout);

router.get("/me", userMiddleware, getMe);

router.put("/update", userMiddleware, updateUser);

router.get("/purchases", userMiddleware, purchase);

router.post("/buycourse/:courseId", userMiddleware, buyCourse);


export default router;
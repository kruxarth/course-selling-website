import express from "express";
const router = express.Router();

import { adminSignup, adminSignin, createCourse, deleteCourse, logout, upCourse, getAdminMe, updateAdmin, getAdminCourses } from "../controllers/adminController.js";
import { adminMiddleware } from "../middlewares/admin.js";

router.post('/signup', adminSignup);

router.post('/signin', adminSignin);

router.post('/logout', logout);

router.get("/me", adminMiddleware, getAdminMe);

router.put("/update", adminMiddleware, updateAdmin);

router.get("/courses", adminMiddleware, getAdminCourses);

router.delete("/delete/:courseId", adminMiddleware, deleteCourse);

router.post("/create", adminMiddleware, createCourse);
router.put("/update/:courseId", adminMiddleware, upCourse);

export default router;

// router.post('/course', adminMiddleware, function(req, res){
//     res.json({
//         message: "text"
//     })
// })

// router.put("/course", adminMiddleware, function(req, res){
//     res.json({
//         message: "text"
//     })
// })

// router.get("/course/bulk", adminMiddleware, function(req, res){
//     res.json({
//         message: "text"
//     })
// })






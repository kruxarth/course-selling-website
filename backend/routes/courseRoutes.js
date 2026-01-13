import express from "express";
import { getAllCourses, courseDetails } from "../controllers/courseController.js";


const router = express.Router();



router.get("/all", getAllCourses);
router.get("/:courseId", courseDetails);

export default router;








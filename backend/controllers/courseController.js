import { courseModel, purchaseModel } from "../config/db.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";



export const getAllCourses = async (req, res) => {
	try {
		const courses = await courseModel.find({}).populate("creatorId", "firstName lastName");
		return res.status(200).json({ courses });
	} catch (error) {
		console.log("error getting courses", error);
		return res.status(500).json({ error: "Error getting courses" });
	}
};

export const courseDetails = async (req, res)=> {
    
    const {courseId} = req.params;

    
    try {
    
        const course = await courseModel.findById(courseId);
        if(!course){
            return res.status(403).json({message: "Course not found"});
        }
        return res.status(200).json({course})

    } catch (error) {
        console.log("error getting courses", error)
        return res.status(500).json({error: "Error getting course"})
    }
}









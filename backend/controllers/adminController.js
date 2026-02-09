import { adminModel, courseModel } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";


export const adminSignup = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;

	try {

		if (!email || !password || !firstName || !lastName) {
			return res.status(400).json({ error: "all inputs are necessary" });
		}

		const existingUser = await adminModel.findOne({ email: email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}


		const hashedPassword = await bcrypt.hash(password, 10);

		const adminData = {
			email,
			password: hashedPassword,
			firstName,
			lastName,
		};

		const admin = await adminModel.create(adminData);
		console.log("Admin singup was successful");
		return res.status(201).json({ message: "Admin signuped successfully" });
	} catch (error) {
		return res.status(500).json({ error: "error during signup" });
	}
};

export const adminSignin = async (req, res) => {

	const { email, password } = req.body

	const admin = await adminModel.findOne({
		email: email
	})

	if (!admin) {
		return res.status(402).json({ message: "invalid user credentials" })
	}

	const matchedPassword = await bcrypt.compare(password, admin.password);

	if (!matchedPassword) {
		return res.status(403).json({ message: "Invalid password credentials" })
	}

	const token = jwt.sign(
		{
			id: admin._id,
		},
		process.env.JWT_ADMIN_PASSWORD
	);

	return res.json({
		token: token,
	});
}



export const logout = (req, res) => {
	return res.status(200).json({ message: "You logged out successfully" });
}



export const deleteCourse = async (req, res) => {
	const adminId = req.adminId;

	const { courseId } = req.params;

	try {
		if (!mongoose.Types.ObjectId.isValid(courseId)) {
			return res.status(400).json({ error: "Invalid course id" });
		}
		const course = await courseModel.findOneAndDelete({
			_id: courseId,
			creatorId: adminId
		});
		if (!course) {
			return res.status(404).json({ error: "Course not found" });
		}
		return res.status(200).json({ message: "course deleted successfully" });
	} catch (error) {
		console.log("Error in course deletion");
		return res.status(500).json({ error: "Error deleting course" });
	}
};



export const upCourse = async (req, res) => {

	const { courseId } = req.params;
	const { title, description, price } = req.body;

	try {
		if (!mongoose.Types.ObjectId.isValid(courseId)) {
			return res.status(400).json({ error: "Invalid course id" });
		}

		const course = await courseModel.findById(courseId);

		if (!course) {
			return res.status(404).json("Course Id not found");
		}

		course.title = title ?? course.title;
		course.description = description ?? course.description;
		course.price = price ?? course.price;

		const imageFile = req.files?.image
		if (imageFile) {
			if (course.image?.public_id) {
				await cloudinary.uploader.destroy(course.image.public_id);
			}

			const result = await cloudinary.uploader.upload(imageFile.tempFilePath);

			course.image = {
				public_id: result.public_id,
				url: result.secure_url
			}

		}

		await course.save();
		return res.status(200).json({ message: "course updated successfully" })


	} catch (error) {
		console.log("error updating course", error)
		return res.status(500).json({ error: " error updating course" })
	}
}



export const createCourse = async (req, res) => {
	const { title, description, price } = req.body;

	try {
		if (!title || !description || !price) {
			return res.status(400).json({ error: "All fields are necessary" });
		}

		// const {image} = req.files
		// if(!req.files || Object.keys(req.files).length===0 ){
		//     return res.status(400).json({errors: "No files uploaded"})
		// }
		if (!req.files || !req.files.image) {
			return res.status(400).json({ error: "Image is required" });
		}

		const image = req.files.image;

		// const allowedFormat = ["images/png", "images/jpeg", "images/jpg"]
		// if(!allowedFormat.includes(images.mimetype)){
		//     return res.status(400).json({errors: "invalid file format. Only PNG, JPEG, JPG are allowed"});
		// }

		const allowedFormat = ["image/png", "image/jpeg", "image/jpg"];

		if (!allowedFormat.includes(image.mimetype)) {
			return res.status(400).json({ error: "Invalid file format" });
		}

		const MAX_SIZE = 5 * 1024 * 1024; // 5MB

		if (image.size > MAX_SIZE) {
			return res.status(400).json({ error: "File too large" });
		}


		//cloud image upload
		// const cloud_response = await cloudinary.uploader.upload(image.tempFilePath)

		const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

		if (!cloud_response || cloud_response.error) {
			return res
				.status(400)
				.json({ errors: "Eror while uploading file to cloudinary" });
		}


		const courseData = {
			title,
			description,
			price,
			image: {
				public_id: cloud_response.public_id,
				url: cloud_response.url,
			},
			creatorId: req.adminId
		};

		const course = await courseModel.create(courseData);
		console.log("Image upload was successful")
		return res.json({
			message: "Course created successfully",
			course,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: "server error. error creating server" });
	}

};




















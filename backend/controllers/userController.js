import { purchaseModel, userModel, courseModel } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const UserSignup = async (req, res) => {
	const { email, firstName, lastName, password } = req.body;

	try {

        const existingUser = await userModel.findOne({email: email})
        if(existingUser){
            return res.status(400).json({message: "User already exists"})
        }

		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({ error: " All fields are necessary" });
		}

		//     await userModel.create({
		//     email: email,
		//     password: password,
		//     firstName: firstName,
		//     lastName: lastName
		// })

		// password hashing

		const hashedPassword = await bcrypt.hash(password, 10);

		const userData = {
			email,
			password: hashedPassword,
			firstName,
			lastName,
		};

		const user = await userModel.create(userData);

		console.log("User Signuped successfully");
		return res.status(201).json({ message: "signup successful for the user" });
	} catch (error) {
		return res.status(500).json({ error: "Eror during signup" });
	}
};

export const UserSignin = async (req, res) => {
	const { email, password } = req.body;

	const user = await userModel.findOne({
		email: email,
		// password: password
	});

	if (!user) {
		return res.status(403).json({ error: "incorrect user credentials" });
	}

	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		return res.status(403).json({ error: "incorrect password credentials" });
	}

	const token = jwt.sign(
		{
			id: user._id,
		},
		process.env.JWT_USER_PASSWORD
	);

	return res.json({
		token: token,
	});
};

export const logout = (req, res)=>{
	return res.status(200).json({message: "You logged out successfully"});
}

export const getMe = async (req, res) => {
	try {
		const user = await userModel.findById(req.userId).select("-password");
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ error: "Error fetching user profile" });
	}
}

export const updateUser = async (req, res) => {
	const { firstName, lastName } = req.body;

	try {
		const user = await userModel.findById(req.userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		user.firstName = firstName ?? user.firstName;
		user.lastName = lastName ?? user.lastName;
		await user.save();

		const updated = user.toObject();
		delete updated.password;

		return res.status(200).json({ message: "Profile updated successfully", user: updated });
	} catch (error) {
		return res.status(500).json({ error: "Error updating profile" });
	}
}

// export const purchase = async (req, res)={
// 	const userId = req.userId;
// 	try {
// 		const purchased = await purchase.find({userId})

// 		let purchasedCourseId = []
// 	} catch (error) {
		
// 	}

// }
export const purchase = async (req, res)=>{
	const userId = req.userId;
	try {
		const purchases = await purchaseModel.find({userId}).populate("courseId");

		const courses = purchases.map(p => p.courseId);

		return res.status(200).json({
			success: true,
			courses
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error while fetching purchases"
		})
	}
}


export const buyCourse = async(req, res)=>{
	const {userId}= req;

	const{courseId} = req.params

	try {
		const course =  await courseModel.findById(courseId)
		if(!course){
			return res.status(404).json({error: "Course not found"});
		}

		const existingPurchase = await purchaseModel.findOne({userId, courseId})

		if(existingPurchase){
			return res.status(400).json({error: "User has already purchased this course"})
		}

		
		const newPurchase = new purchaseModel({userId, courseId});
		await newPurchase.save();
		
		return res.status(200).json({message: "Course purchased successfully"});

	} catch(error){
		return res.status(403).json({message: "Course not found"})
	}
}

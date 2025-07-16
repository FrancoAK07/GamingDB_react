import User from "../models/User.js";
import { hashPassword, verifyPassword } from "../utils/authUtils.js";

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const createUser = async (req, res) => {
	const { userName, userEmail, userPassword } = req.body;
	const hashedPassword = await hashPassword(userPassword);
	try {
		const user = await User.create({ User_Name: userName, Email: userEmail, Password: hashedPassword });
		const userResponse = { userId: user.User_Id, name: user.User_Name, email: user.Email };
		res.status(200).json(userResponse);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const loginUser = async (req, res) => {
	const { userEmail, userPassword } = req.body;
	try {
		const user = await User.findOne({ where: { Email: userEmail } });
		if (!user) {
			return res.status(400).json("No user found");
		}
		const matchPasswords = await verifyPassword(userPassword, user.Password);
		if (matchPasswords) {
			const userResponse = { Id: user.User_Id, name: user.User_Name, email: user.Email };
			res.status(200).json(userResponse);
		} else {
			res.status(401).json("Invalid password");
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

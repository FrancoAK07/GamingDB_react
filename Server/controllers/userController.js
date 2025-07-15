import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const createUser = async (req, res) => {
	const { userName, userEmail, userPassword } = req.body;
	console.log(req.body);
	try {
		const user = await User.create({ User_Name: userName, Email: userEmail, Password: userPassword });
		res.status(200).json(user);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

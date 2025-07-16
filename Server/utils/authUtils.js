import bcrypt from "bcrypt";

const hashPassword = async (password) => {
	const saltRounds = 10;
	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	} catch (error) {
		console.error("Error hashing password:", error);
		throw error;
	}
};

const verifyPassword = async (password, storedPassword) => {
	try {
		const match = await bcrypt.compare(password, storedPassword);
		return match;
	} catch (error) {
		console.error("Incorrect password:", error);
		throw error;
	}
};

//name exports
export { hashPassword, verifyPassword };

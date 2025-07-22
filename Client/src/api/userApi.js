import axios from "axios";

const apiUrl = "https://gamingdb-react.onrender.com/user";

// Log in user
export const loginUser = async (userEmail, userPassword) => {
	const loginData = await axios.post(`${apiUrl}/login`, {
		userEmail: userEmail,
		userPassword: userPassword,
	});

	return loginData;
};

// Create user
export const createUser = async (userName, userEmail, userPassword) => {
	const createdUserResponse = await axios.post(`${apiUrl}`, {
		userName: userName,
		userEmail: userEmail,
		userPassword: userPassword,
	});

	return createdUserResponse;
};

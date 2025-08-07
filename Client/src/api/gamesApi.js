import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_URL}/game`;

export const getAllGames = async () => {
	try {
		const games = await axios.get(`${apiUrl}/getAll`);
		return games;
	} catch (error) {
		console.error("Login error:", error);
		return error.response ? error.response.data : error.message;
	}
};

export const getRecentGames = async () => {
	try {
		const recentGames = await axios.get(`${apiUrl}/recent`);
		return recentGames;
	} catch (error) {
		console.error("Login error:", error);
		return error.response ? error.response.data : error.message;
	}
};

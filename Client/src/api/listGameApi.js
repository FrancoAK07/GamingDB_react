import axios from "axios";

const apiUrl = "https://gamingdb-react.onrender.com/listGames";

export const getListGames = async () => {
	try {
		const listGames = await axios.get(`${apiUrl}/all`);
		return listGames;
	} catch (error) {
		console.error("Login error:", error);
		return error.response ? error.response.data : error.message;
	}
};

export const getThisListGames = async (listId) => {
	try {
		const thisListGames = await axios.get(`${apiUrl}/games`, { params: { listId: listId } });
		return thisListGames;
	} catch (error) {
		console.error("Login error:", error);
		return error.response ? error.response.data : error.message;
	}
};

export const deleteListGame = async (listId, gameId) => {
	try {
		const deletedGameResponse = await axios.delete(`${apiUrl}`, {
			params: { listId: listId, gameId: gameId },
		});

		return deletedGameResponse;
	} catch (error) {
		console.error("Login error:", error);
		return error.response ? error.response.data : error.message;
	}
};

import sequelize from "../models/index.js";
import { QueryTypes } from "sequelize";
import ListGame from "../models/listGame.js";

export const getListGames = async (req, res) => {
	try {
		const listGames = await ListGame.findAll();
		res.status(200).json(listGames);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getThisListGames = async (req, res) => {
	const { listId } = req.query;
	try {
		const listGames = await ListGame.findAll({
			where: { List_Id: listId },
		});
		res.status(200).json(listGames);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const deleteListGame = async (req, res) => {
	const { listId, gameId } = req.query;
	try {
		await ListGame.destroy({
			where: { List_Id: listId, Game_Id: gameId },
		});
		res.status(200).json("Deleted successfully");
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

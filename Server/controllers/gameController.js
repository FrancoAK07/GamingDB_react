import Game from "../models/Game.js";
import sequelize from "../models/index.js";
import { QueryTypes } from "sequelize";

export async function getAllGames(req, res) {
	try {
		const games = await Game.findAll();
		res.status(200).json(games);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export async function getRecentGames(req, res) {
	try {
		const recentGames = await sequelize.query('SELECT * FROM "Games" ORDER BY "Game_ID" DESC LIMIT 4', {
			type: QueryTypes.SELECT,
		});
		res.status(200).json(recentGames);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

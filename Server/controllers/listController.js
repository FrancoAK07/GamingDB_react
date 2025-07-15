import List from "../models/List.js";
import sequelize from "../models/index.js";
import { QueryTypes } from "sequelize";

export async function createList(req, res) {
	const { listName, userId } = req.body;
	console.log(req.body);
	try {
		const createdList = await List.create({ List_Name: listName, User_Id: userId });
		res.status(200).json(createdList);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export async function getMyLists(req, res) {
	const { userId } = req.query;
	try {
		const myLists = await List.findAll({
			where: { User_Id: userId },
		});
		res.status(200).json(myLists);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export async function addToList(req, res) {
	const { listId, gameId } = req.body;
	try {
		await sequelize.query(`INSERT INTO "ListGames" ("List_Id", "Game_Id") VALUES (:ListId, :GameId)`, {
			replacements: { ListId: listId, GameId: gameId },
			type: QueryTypes.INSERT,
		});
		res.status(200).json("Game added successfully");
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export async function getListImage(req, res) {
	const { userId } = req.query;
	try {
		const data = await sequelize.query(
			`SELECT "Lists"."List_Id", "Games"."Game_Img", "Games"."Game_ID" FROM "Lists"
            JOIN "ListGames" ON "Lists"."List_Id" = "ListGames"."List_Id" JOIN "Games"
            ON "ListGames"."Game_Id" = "Games"."Game_ID" WHERE "Lists"."User_Id" = :UserId`,
			{
				replacements: { UserId: userId },
				type: QueryTypes.SELECT,
			}
		);
		res.status(200).json(data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export async function deleteList(req, res) {
	const { listId } = req.query;
	try {
		await List.destroy({
			where: { List_Id: listId },
		});
		res.status(200).json("Deleted successfully");
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

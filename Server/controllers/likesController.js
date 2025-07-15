import Like from "../models/Like.js";
import sequelize from "../models/index.js";
import { QueryTypes } from "sequelize";

export async function getLikes(req, res) {
	try {
		const likes = await Like.findAll();
		res.status(200).json(likes);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export async function saveLike(req, res) {
	const { userId, reviewId } = req.body;
	try {
		await sequelize.query(`INSERT INTO "Likes" ("User_Id", "Review_Id") VALUES (:UserId, :ReviewId)`, {
			replacements: { UserId: userId, ReviewId: reviewId },
			type: QueryTypes.INSERT,
		});
		res.status(200).json("Like saved successfully");
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export async function deleteLike(req, res) {
	const { userId, reviewId } = req.query;
	console.log(userId, reviewId);
	try {
		await Like.destroy({
			where: { User_Id: userId, Review_Id: reviewId },
		});
		res.status(200).json("Like deleted successfully");
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

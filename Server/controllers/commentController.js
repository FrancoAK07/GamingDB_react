import sequelize from "../models/index.js";
import { QueryTypes } from "sequelize";
import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
	try {
		const comments = await sequelize.query(
			`SELECT "Comments".*, "Users"."User_Name" FROM "Comments"
            INNER JOIN "Users" ON "Comments"."User_Id" = "Users"."User_Id"`,
			{
				type: QueryTypes.SELECT,
			}
		);
		res.status(200).json(comments);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const saveComment = async (req, res) => {
	const { comment, userId, reviewId } = req.body;
	try {
		const savedComment = await Comment.create({ Comment_Text: comment, User_Id: userId, Review_Id: reviewId });
		res.status(200).json(savedComment);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

import sequelize from "../models/index.js";
import { QueryTypes } from "sequelize";
import Review from "../models/Review.js";

export const getLastReviews = async (req, res) => {
	try {
		const latestReviews = await sequelize.query(
			'SELECT * FROM "Reviews" INNER JOIN "Games" ON "Reviews"."Game_ID" = "Games"."Game_ID" ORDER BY "Review_ID" DESC LIMIT 4',
			{
				type: QueryTypes.SELECT,
			}
		);
		res.status(200).json(latestReviews);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const saveReview = async (req, res) => {
	const { review, rating, platform, user, gameId, userId } = req.body;
	try {
		const savedReview = await Review.create({
			Game_Review: review,
			Game_Rating: rating,
			Platform: platform,
			User: user,
			Game_ID: gameId,
			User_Id: userId,
		});
		res.status(200).json(savedReview);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getMyReviews = async (req, res) => {
	const { userId } = req.query;
	try {
		const myReviews = await sequelize.query(
			`SELECT * FROM "Reviews" INNER JOIN "Games" ON "Reviews"."Game_ID" = "Games"."Game_ID" WHERE "User_Id" = :userid`,
			{
				replacements: { userid: userId },
				type: QueryTypes.SELECT,
			}
		);
		res.status(200).json(myReviews);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const updateReview = async (req, res) => {
	const { review, rating, platform, reviewID } = req.body;
	try {
		await sequelize.query(
			`UPDATE "Reviews" SET "Game_Review" = :Review, "Game_Rating" = :Rating, "Platform" = :Platform WHERE "Review_ID" = :ReviewID`,
			{
				replacements: { Review: review, Rating: rating, Platform: platform, ReviewID: reviewID },
				type: QueryTypes.UPDATE,
			}
		);
		res.status(200).json("Updated successfully");
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getReviewInfo = async (req, res) => {
	const { reviewID } = req.query;
	try {
		const reviewInfo = await sequelize.query(
			`select * from "Reviews" INNER JOIN "Games" ON "Reviews"."Game_ID" = "Games"."Game_ID" WHERE "Review_ID" = :ReviewID`,
			{
				replacements: { ReviewID: reviewID },
				type: QueryTypes.SELECT,
			}
		);
		res.status(200).json(reviewInfo);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const deleteReview = async (req, res) => {
	const { reviewID } = req.query;
	try {
		await Review.destroy({
			where: {
				Review_ID: reviewID,
			},
		});
		res.status(200).json("Deleted successfully");
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

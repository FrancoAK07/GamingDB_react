import express from "express";
import {
	getLastReviews,
	saveReview,
	getMyReviews,
	updateReview,
	getReviewInfo,
	deleteReview,
} from "../controllers/reviewControllers.js";

const router = express.Router();

router.get("/recent", getLastReviews);
router.get("/myReviews", getMyReviews);
router.get("/reviewInfo", getReviewInfo);
router.post("/", saveReview);
router.put("/", updateReview);
router.delete("/", deleteReview);

export { router as reviewRoutes };

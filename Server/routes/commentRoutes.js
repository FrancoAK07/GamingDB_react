import express from "express";
import { getComments, saveComment } from "../controllers/commentController.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", saveComment);

export { router as commentRoutes };

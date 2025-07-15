import express from "express";
import { getLikes, saveLike, deleteLike } from "../controllers/likesController.js";

const router = express.Router();

router.get("/", getLikes);
router.post("/", saveLike);
router.delete("/", deleteLike);

export { router as likesRoutes };

import express from "express";
import { getAllGames, getRecentGames } from "../controllers/gameController.js";

const router = express.Router();

router.get("/getAll", getAllGames);
router.get("/recent", getRecentGames);

export { router as gameRoutes };

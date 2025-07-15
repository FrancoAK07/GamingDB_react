import express from "express";
import { getListGames, getThisListGames, deleteListGame } from "../controllers/listGameController.js";

const router = express.Router();

router.get("/all", getListGames);
router.get("/games", getThisListGames);
router.delete("/", deleteListGame);

export { router as listGamesRoutes };

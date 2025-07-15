import express from "express";
import { userRoutes } from "./userRoutes.js";
import { gameRoutes } from "./gameRoutes.js";
import { reviewRoutes } from "./reviewsRoutes.js";
import { listRoutes } from "./listRoutes.js";
import { listGamesRoutes } from "./listGamesRoutes.js";

const router = express.Router();

//Register the routes
router.use("/user", userRoutes);
router.use("/game", gameRoutes);
router.use("/review", reviewRoutes);
router.use("/list", listRoutes);
router.use("/listGames", listGamesRoutes);

export default router;

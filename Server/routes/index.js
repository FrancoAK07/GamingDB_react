import express from "express";
import { userRoutes } from "./userRoutes.js";
import { gameRoutes } from "./gameRoutes.js";
import { reviewRoutes } from "./reviewsRoutes.js";
import { listRoutes } from "./listRoutes.js";
import { listGamesRoutes } from "./listGamesRoutes.js";
import { likesRoutes } from "./likesRoutes.js";
import { commentRoutes } from "./commentRoutes.js";

const router = express.Router();

//Register the routes
router.use("/user", userRoutes);
router.use("/game", gameRoutes);
router.use("/review", reviewRoutes);
router.use("/list", listRoutes);
router.use("/listGames", listGamesRoutes);
router.use("/likes", likesRoutes);
router.use("/comment", commentRoutes);

export default router;

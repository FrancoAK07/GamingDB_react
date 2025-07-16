import express from "express";
import { getAllUsers, createUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/getAll", getAllUsers);
router.post("/", createUser);
router.post("/login", loginUser);

export { router as userRoutes };

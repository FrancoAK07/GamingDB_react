import express from "express";
import { createList, getMyLists, addToList, getListImage, deleteList } from "../controllers/listController.js";

const router = express.Router();

router.get("/myLists", getMyLists);
router.get("/listImage", getListImage);
router.post("/create", createList);
router.post("/add", addToList);
router.delete("/", deleteList);

export { router as listRoutes };

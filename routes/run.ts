import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import uploadRunItem from "../controllers/uploadRunItem";

import { getRunItem } from "../controllers/getRunItem";
import { getRunItemList } from "../controllers/getRunItemList";
import { deleteRunItem } from "../controllers/deleteRunItem";

const router = express.Router();

router.post("/register", isLoggedIn, uploadRunItem);
router.get("/:runItemId", isLoggedIn, getRunItem);
router.get("/list/:mock", getRunItemList);
router.delete("/delete/:runItemId", isLoggedIn, deleteRunItem);
export default router;

import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import uploadRunItem from "../controllers/uploadRunItem";

import { getRunItem } from "../controllers/getRunItem";
import { getRunItemList } from "../controllers/getRunItemList";

const router = express.Router();

router.post("/register", isLoggedIn, uploadRunItem);
router.get("/", isLoggedIn, getRunItem);
router.get("/list", isLoggedIn, getRunItemList);

export default router;

import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import uploadRunItem from "../controllers/uploadRunItem";

const router = express.Router();

router.post("/register", isLoggedIn, uploadRunItem);

export default router;

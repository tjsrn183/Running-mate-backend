import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";

import { uploadPost } from "../controllers/uploadPost";

const router = express.Router();

router.post("/", isLoggedIn, uploadPost);

export default router;

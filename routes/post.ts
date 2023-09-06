import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";

import { uploadPost } from "../controllers/uploadPost";
import { postDetail } from "../controllers/postDetail";
const router = express.Router();

//router.get('/',isLoggedIn,postList)
router.post("/", isLoggedIn, uploadPost);
router.get("/:id", isLoggedIn, postDetail);
//router.delete('/:id',isLoggedIn,postDelete);

export default router;

import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import { postList } from "../controllers/postList";
import { uploadPost } from "../controllers/uploadPost";
import { postDetail } from "../controllers/postDetail";
import { sanitizeHtml } from "../middlewares/sanitizeHtml";
import { editPost } from "../controllers/editPost";
import { postDelete } from "../controllers/postDelete";
const router = express.Router();

router.post("/", isLoggedIn, uploadPost);
router.get("/:id", isLoggedIn, postDetail);
router.get("/list/:page", isLoggedIn, postList, sanitizeHtml);
router.put("/edit/:postId", isLoggedIn, editPost);
router.delete("/delete/:postId", isLoggedIn, postDelete);

export default router;

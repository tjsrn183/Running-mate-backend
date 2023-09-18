import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import { postList } from "../controllers/postList";
import { imgUpload, uploadPost } from "../controllers/uploadPost";
import { postDetail } from "../controllers/postDetail";
import { sanitizeHtml } from "../middlewares/sanitizeHtml";
import { editPost } from "../controllers/editPost";
import { postDelete } from "../controllers/postDelete";
import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/uploads");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      console.log("file.originalname", file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
const router = express.Router();

router.post("/", isLoggedIn, uploadPost);
router.get("/:id", isLoggedIn, postDetail);
router.get("/list/:page", isLoggedIn, postList, sanitizeHtml);
router.put("/edit/:postId", isLoggedIn, editPost);
router.delete("/delete/:postId", isLoggedIn, postDelete);
router.post("/img", isLoggedIn, upload.single("img"), imgUpload);

export default router;

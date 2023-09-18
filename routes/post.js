"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const postList_1 = require("../controllers/postList");
const uploadPost_1 = require("../controllers/uploadPost");
const postDetail_1 = require("../controllers/postDetail");
const sanitizeHtml_1 = require("../middlewares/sanitizeHtml");
const editPost_1 = require("../controllers/editPost");
const postDelete_1 = require("../controllers/postDelete");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, "public/uploads");
        },
        filename(req, file, cb) {
            const ext = path_1.default.extname(file.originalname);
            console.log("file.originalname", file.originalname);
            cb(null, path_1.default.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
const router = express_1.default.Router();
router.post("/", middlewares_1.isLoggedIn, uploadPost_1.uploadPost);
router.get("/:id", middlewares_1.isLoggedIn, postDetail_1.postDetail);
router.get("/list/:page", middlewares_1.isLoggedIn, postList_1.postList, sanitizeHtml_1.sanitizeHtml);
router.put("/edit/:postId", middlewares_1.isLoggedIn, editPost_1.editPost);
router.delete("/delete/:postId", middlewares_1.isLoggedIn, postDelete_1.postDelete);
router.post("/img", middlewares_1.isLoggedIn, upload.single("img"), uploadPost_1.imgUpload);
exports.default = router;

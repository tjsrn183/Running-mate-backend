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
const router = express_1.default.Router();
//router.get('/',isLoggedIn,postList)
router.post("/", middlewares_1.isLoggedIn, uploadPost_1.uploadPost);
router.get("/:id", middlewares_1.isLoggedIn, postDetail_1.postDetail);
router.get("/list/:page", middlewares_1.isLoggedIn, postList_1.postList);
//router.delete('/:id',isLoggedIn,postDelete);
exports.default = router;

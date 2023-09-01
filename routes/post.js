"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const uploadPost_1 = require("../controllers/uploadPost");
const router = express_1.default.Router();
router.post("/", middlewares_1.isLoggedIn, uploadPost_1.uploadPost);
exports.default = router;

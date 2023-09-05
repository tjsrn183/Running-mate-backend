"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const page_1 = require("../controllers/page");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.get("/profile", middlewares_1.isLoggedIn, page_1.renderProfile);
router.get("/join", middlewares_1.isNotLoggedIn, page_1.renderJoin);
router.get("/", middlewares_1.isLoggedIn, page_1.renderComunityPage);
exports.default = router;

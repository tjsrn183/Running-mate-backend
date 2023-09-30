"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const uploadRunItem_1 = __importDefault(require("../controllers/uploadRunItem"));
const getRunItem_1 = require("../controllers/getRunItem");
const getRunItemList_1 = require("../controllers/getRunItemList");
const router = express_1.default.Router();
router.post("/register", middlewares_1.isLoggedIn, uploadRunItem_1.default);
router.get("/:runItemId", middlewares_1.isLoggedIn, getRunItem_1.getRunItem);
router.get("/list/:mock", getRunItemList_1.getRunItemList);
exports.default = router;

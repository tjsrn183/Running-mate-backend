"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postList = void 0;
const models_1 = require("../models");
const user_1 = __importDefault(require("../models/user"));
const postList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let postPage = req.params.page;
        const postListfunc = yield models_1.Post.findAll({
            attributes: ["content", "createdAt", "title", "postId"],
            order: [["createdAt", "DESC"]],
            limit: 5,
            include: { model: user_1.default, attributes: ["nick"] },
        });
        console.log("postList에 postListfunc", postListfunc);
        res.json(postListfunc);
        res.end();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.postList = postList;

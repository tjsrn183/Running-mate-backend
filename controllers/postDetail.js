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
exports.postDetail = void 0;
const models_1 = require("../models");
const user_1 = __importDefault(require("../models/user"));
const postDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("postDetail 컨트롤러 실행됨");
        const getPostDetaile = yield models_1.Post.findOne({
            where: { postId: req.params.id },
            include: { model: user_1.default, attributes: ["nick"] },
        });
        console.log("postDetail에서 찍어본 getPostDetail", getPostDetaile);
        res.json(getPostDetaile);
        res.end();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.postDetail = postDetail;

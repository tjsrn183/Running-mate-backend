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
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderComunityPage = exports.renderJoin = exports.renderProfile = void 0;
const models_1 = require("../models");
const renderProfile = (req, res) => {
    res.render("profile", { title: "내정보 - 황선구" });
};
exports.renderProfile = renderProfile;
const renderJoin = (req, res) => {
    res.render("join", { title: "회원가입- 러닝메이트" });
};
exports.renderJoin = renderJoin;
const renderComunityPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield models_1.Post.findAll({
            include: {
                model: models_1.User,
                attributes: ["id", "nick"],
            },
            order: [["createdAt", "DESC"]],
        });
        res.json(posts);
        res.end();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.renderComunityPage = renderComunityPage;

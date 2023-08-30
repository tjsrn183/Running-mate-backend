"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const localStrategy_1 = __importDefault(require("./localStrategy"));
const kakaoStrategy_1 = __importDefault(require("./kakaoStrategy"));
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.serializeUser((data, done) => {
        done(null, { id: data.user.id, accessToken: data.accessToken });
    });
    passport_1.default.deserializeUser((user, done) => {
        user_1.default.findOne({ where: { id: user.id } })
            .then((user) => {
            const tokenUser = { user: user, accessToken: user.accessToken };
            console.log("deserializeUser에서의 tokenUser", tokenUser);
            done(null, tokenUser);
        })
            .catch((err) => done(err));
    });
    (0, localStrategy_1.default)();
    (0, kakaoStrategy_1.default)();
};

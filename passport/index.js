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
    passport_1.default.serializeUser((user, done) => {
        console.log("user의 타입을 알아보자", user);
        done(null, { id: user.id, accessToken: user.accessToken });
    });
    passport_1.default.deserializeUser((user, done) => {
        user_1.default.findOne({ where: { id: user.id } })
            .then((user) => {
            const tokenUser = { user: user, accessToken: user.accessToken };
            done(null, tokenUser);
        })
            .catch((err) => done(err));
    });
    (0, localStrategy_1.default)();
    (0, kakaoStrategy_1.default)();
};

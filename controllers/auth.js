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
exports.login = exports.join = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const join = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nick, id, password } = req.body;
    try {
        const exUser = yield user_1.default.findOne({ where: { user_id: id } });
        if (exUser) {
            res.json({ message: "이미 가입된 아이디입니다." });
            res.end();
        }
        const hash = yield bcrypt_1.default.hash(password, 12);
        yield user_1.default.create({
            user_id: id,
            nick: nick,
            password: hash,
            provider: "local",
        });
        res.json({ message: "회원가입 성공" });
        console.log("이게 실행이되나요");
        res.end();
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
});
exports.join = join;
const login = (req, res, next) => {
    passport_1.default.authenticate("local", (authError, user, info) => {
        console.log("authError, user,info 타입수정해라", authError, user, info);
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.json({ message: info.message });
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            res.json({ message: "로그인 성공" });
            res.end();
        });
    })(req, res, next);
};
exports.login = login;
const logout = (req, res) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.end();
        });
    });
};

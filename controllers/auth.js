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
exports.userInfo = exports.logout = exports.login = exports.join = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const axios_1 = __importDefault(require("axios"));
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
            res.send([]);
            return next(authError);
        }
        if (!user) {
            return res.json({ message: info.message });
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                res.send([]);
                return next(loginError);
            }
            res.json({ message: "로그인 성공" });
            res.end();
        });
    })(req, res, next);
};
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const ACCESS_TOKEN = res.locals.user.accessToken;
        console.log("로그아웃 라우터에서 req.user", req.user);
        console.log("로그아웃 라우터에서 엑세스 토큰 찍어봄", ACCESS_TOKEN);
        console.log("로그아웃 라우터에서 req.user.user.provider", (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.provider);
        console.log("로그아웃 라우터에서 req.user.user.dataValues.provider", (_b = req.user) === null || _b === void 0 ? void 0 : _b.user.dataValues.provider);
        if (((_c = req.user) === null || _c === void 0 ? void 0 : _c.user.provider) == "kakao") {
            yield (0, axios_1.default)({
                method: "post",
                url: "https://kapi.kakao.com/v1/user/logout",
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            });
        }
        req.logout(() => {
            req.session.destroy(() => {
                res.clearCookie("connect.sid");
                res.end();
            });
        });
    }
    catch (error) {
        console.error(error);
        res.json(error);
    }
});
exports.logout = logout;
const userInfo = (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
        console.log("userinfo에서 req.user", req.user);
    }
    else {
        res.json({
            message: "사용자가 로그인되어 있지 않습니다.3트",
        });
    }
};
exports.userInfo = userInfo;

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
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const axios_1 = __importDefault(require("axios"));
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
router.get("/kakao", passport_1.default.authenticate("kakao"));
router.get("/kakao/callback", passport_1.default.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오 로그인 실패",
}), (req, res) => {
    res.redirect("http://localhost:3000");
});
router.get("/userinfo", middlewares_1.isLoggedIn, (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    }
    else {
        res.json({
            message: "사용자가 로그인되어 있지 않습니다.3트",
        });
    }
});
router.post("/kakao/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ACCESS_TOKEN = res.locals.user.accessToken;
        console.log("로그아웃 라우터에서 req.user", req.user);
        console.log("로그아웃 라우터에서 엑세스 토큰 찍어봄", ACCESS_TOKEN);
        yield (0, axios_1.default)({
            method: "post",
            url: "https://kapi.kakao.com/v1/user/logout",
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
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
}));
exports.default = router;

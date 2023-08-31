import express from "express";
import passport from "passport";
import axios from "axios";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import { join, login, logout } from "../controllers/auth";
import { RequestHandler } from "express";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
router.post("/join", isNotLoggedIn, join);

router.post("/login", isNotLoggedIn, login);

router.post("/logout", isLoggedIn, logout);

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오 로그인 실패",
  }),
  (req, res) => {
    console.log("req정보다", req.user);
    res.redirect("http://localhost:3000");
  }
);

router.get("/userinfo", isLoggedIn, (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
    console.log(
      "userInfo 라우터에서 res.locals.accessToken",
      res.locals.user.accessToken
    );
    console.log("userInfo 라우터에서 res.locals.user", res.locals.user);
  } else {
    res.json({
      message: "사용자가 로그인되어 있지 않습니다.3트",
    });
  }
});

router.post("/kakao/logout", async (req, res) => {
  try {
    const ACCESS_TOKEN = res.locals.user.accessToken;
    console.log("로그아웃 라우터에서 req.user", req.user);
    console.log("로그아웃 라우터에서 엑세스 토큰 찍어봄", ACCESS_TOKEN);
    await axios({
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
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

export default router;

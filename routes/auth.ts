import express from "express";
import passport from "passport";

import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import { join, login, logout } from "../controllers/auth";

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
router.get("/userinfo", (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
    console.log("리퀘스트정보", req.user);
  } else {
    res.json({
      message: "사용자가 로그인되어 있지 않습니다.3트",
      user: req.user,
    });
  }
});
export default router;

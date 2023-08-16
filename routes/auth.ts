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
    res.redirect("http://localhost:3000");
  }
);
router.get("/userinfo", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ message: "사용자가 로그인되어 있지 않습니다." });
  }
});
export default router;

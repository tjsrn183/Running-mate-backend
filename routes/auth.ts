import express from "express";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import { join, login, logout, userInfo } from "../controllers/auth";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
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

router.get("/userinfo", isLoggedIn, userInfo);
router.post("/logout", isLoggedIn, logout);
router.post("/join", isNotLoggedIn, join);
router.post("/login", isNotLoggedIn, login);

export default router;

import express from "express";
import passport from "passport";
import cors from "cors";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import { join, login, logout } from "../controllers/auth";

const router = express.Router();

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

export default router;

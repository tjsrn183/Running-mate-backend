import express from "express";
import passport from "passport";

import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import { join, login, logout } from "../controllers/auth";

const router = express.Router();

router.post("/join", isNotLoggedIn, join);

router.post("/login", isNotLoggedIn, login);

router.post("/logout", isLoggedIn, logout);

export default router;

import express from "express";
import {
  renderProfile,
  renderJoin,
  renderComunityPage,
} from "../controllers/page";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";

const router = express.Router();
router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", isLoggedIn, renderComunityPage);

export default router;

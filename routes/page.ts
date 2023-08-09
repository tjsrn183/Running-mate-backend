import express from "express";
import { renderProfile, renderJoin, renderMain } from "../controllers/page";

const router = express.Router();
router.get("/profile", renderProfile);
router.get("/join", renderJoin);
router.get("/", renderMain);

export default router;

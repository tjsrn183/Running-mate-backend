import { RequestHandler } from "express";
import { User, Post } from "../models";

export const renderProfile: RequestHandler = (req, res) => {
  res.render("profile", { title: "내정보 - 황선구" });
};

export const renderJoin: RequestHandler = (req, res) => {
  res.render("join", { title: "회원가입- 러닝메이트" });
};
export const renderComunityPage: RequestHandler = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

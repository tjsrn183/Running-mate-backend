import { Post } from "../models";
import { RequestHandler } from "express";

export const uploadPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.body,
      name: req.body.nick,
    });
    console.log("백엔드 uploadPost에서 찍어보는", post);
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

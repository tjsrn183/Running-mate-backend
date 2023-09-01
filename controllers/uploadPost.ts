import { Post } from "../models";
import { RequestHandler } from "express";

export const uploadPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      name: req.body.name,
    });
    res.redirect("http://localhost:3000");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

import { Post } from "../models";
import { RequestHandler } from "express";

export const postList: RequestHandler = async (req, res, next) => {
  try {
    const postListfunc = await Post.findAll({
      attributes: ["content", "createdAt", "title", "postId", "name"],
      order: [["createdAt", "DESC"]],
    });
    console.log("postList에 postListfunc", postListfunc);
    res.locals.data = postListfunc;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

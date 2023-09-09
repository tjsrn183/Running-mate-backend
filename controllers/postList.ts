import { Post } from "../models";
import { RequestHandler } from "express";
import User from "../models/user";
export const postList: RequestHandler = async (req, res, next) => {
  try {
    let postPage = req.params.page;
    const postListfunc = await Post.findAll({
      attributes: ["content", "createdAt", "title", "postId"],
      order: [["createdAt", "DESC"]],
      limit: 5,
      include: { model: User, attributes: ["nick"] },
    });
    console.log("postList에 postListfunc", postListfunc);
    res.json(postListfunc);
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

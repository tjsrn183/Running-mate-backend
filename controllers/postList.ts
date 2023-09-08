import { Post } from "../models";
import { RequestHandler } from "express";
import User from "../models/user";
export const postList: RequestHandler = async (req, res, next) => {
  let postPage = req.params.page;
  const postList = Post.findAll({
    attributes: ["content", "createdAt", "title"],
    order: [["createdAt", "DESC"]],
    limit: 5,
    include: [{ model: User, attributes: ["nick"] }],
  });
  console.log("postList에 postIist", postList);
  res.json(postList);
  res.end();
};

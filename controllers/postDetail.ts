import { Post } from "../models";
import { RequestHandler } from "express";

export const postDetail: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const getPostDetaile = await Post.findOne({
    where: { postId: id },
    include: ["User"],
  });
  res.json(getPostDetaile);
  res.end();
};

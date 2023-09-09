import { Post } from "../models";
import { RequestHandler } from "express";
import User from "../models/user";

export const postDetail: RequestHandler = async (req, res, next) => {
  try {
    const getPostDetaile = await Post.findOne({
      where: { postId: req.params.id },
      include: { model: User, attributes: ["nick"] },
    });
    console.log("postDetail에서 찍어본 getPostDetail", getPostDetaile);
    res.json(getPostDetaile);
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

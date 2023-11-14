import { Post } from "../models";
import { RequestHandler } from "express";

export const postDelete: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.destroy({
      where: {
        postId: req.params.postId,
      },
    });

    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

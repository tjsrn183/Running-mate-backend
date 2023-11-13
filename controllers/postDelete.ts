import { Post } from "../models";
import { RequestHandler } from "express";

export const postDelete: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.destroy({
      where: {
        postId: req.params.postId,
      },
    });
    console.log("postDelete에 post", post);
    console.log("postDelete 실행됌");

    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

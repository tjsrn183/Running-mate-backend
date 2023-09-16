import { Post } from "../models";
import { RequestHandler } from "express";

export const editPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.update(
      {
        content: req.body.body,
        title: req.body.title,
      },
      {
        where: {
          postId: req.params.postId,
        },
      }
    );
    console.log("editPost에 post", post);

    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

import { Post } from "../models";
import { RequestHandler } from "express";
interface User {
  dataValues: Object;
}
export const uploadPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.body,
      name: req.body.nick,
      user_id: req.user?.user.dataValues.id,
    });
    const responseData = {
      postId: post.dataValues.postId,
    };

    console.log("백엔드 uploadPost에서 찍어보는", post);
    console.log("백엔드에서 찍어보는 responseData", responseData);
    res.json(responseData);
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

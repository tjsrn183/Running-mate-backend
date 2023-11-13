import { Post } from "../models";
import { RequestHandler } from "express";

export const imgUpload: RequestHandler = async (req, res, next) => {
  console.log("전달받은 파일", req.file);
  console.log("저장된 파일의 이름", req.file?.filename);
  const IMG_URL = `http://localhost:8000/uploads/${req.file?.filename}`;
  console.log(IMG_URL);
  res.json({ url: IMG_URL });
};
export const uploadPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.body,
      name: req.body.nick,
      UserId: req.user?.user.dataValues.id,
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

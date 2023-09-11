import { RequestHandler } from "express";
import sanitize from "sanitize-html";
interface postType {
  dataValues: {
    postId: number;
    title: string;
    nick: string;
    content: string;
    createdAt: string;
  };
}

const sanitizefunc = (body: string) => {
  const filtered = sanitize(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

export const sanitizeHtml: RequestHandler = (req, res, next) => {
  try {
    res.locals.result = res.locals.data.map((post: postType) => ({
      ...post,
      body: sanitizefunc(post.dataValues.content),
    }));
    console.log(
      "sanitize 라우터에서  res.locals.result찍음",
      res.locals.result
    );

    res.json(res.locals.result);
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

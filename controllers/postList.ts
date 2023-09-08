import { Post } from "../models";
import { RequestHandler } from "express";
export const postList: RequestHandler = async (req, res, next) => {
  let postPage = req.params.page;
};

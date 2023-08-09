import { Request, Response, NextFunction } from "express";

export const renderProfile = (req: Request, res: Response) => {
  res.render("profile", { title: "내정보 - 황선구" });
};

export const renderJoin = (req: Request, res: Response) => {
  res.render("join", { title: "회원가입- 러닝메이트" });
};
export const renderMain = (req: Request, res: Response) => {
  const runItem: Array<string> = [];
  res.render("main", { title: "Main- 러닝메이트", runItem });
};

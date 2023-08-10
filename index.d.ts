import { Request, Response, NextFunction } from "express";
export interface ReqResNext {
  req: Request;
  res: Response;
  next?: NextFunction;
  err?: any;
}

import { Run } from "../models";
import { RequestHandler } from "express";

export const getRunItemList: RequestHandler = async (req, res, next) => {
  try {
    const getRunItemListFunc = await Run.findAll({
      attributes: [
        "start",
        "end",
        "name",
        "durationTime",
        "distance",
        "startLocationNaturalLan",
        "endLocationNaturalLan",
        "runItemId",
      ],
      order: [["createdAt", "DESC"]],
    });
    console.log("getRunItemList에 runItem", getRunItemListFunc);
    res.json(getRunItemListFunc);
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

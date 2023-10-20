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
        "body",
      ],
      order: [["createdAt", "DESC"]],
    });

    const ItemList = getRunItemListFunc.map((runItem) => {
      const body = runItem.dataValues.body;
      const regex = /(<img[^>]*srcWs*=Ws*[₩"']?([^>₩"']+)[₩"']?[^>]*>)/g;

      const matches = body.match(regex);

      console.log("getRunItemList에 matches", matches);
      return {
        ...runItem.dataValues,
        thumbnail: matches
          ? matches[0]
          : "http://localhost:8000/uploads/defaultImg.jpg",
      };
    });

    console.log("getRunItemList에 runItem", ItemList);
    res.json(ItemList);
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

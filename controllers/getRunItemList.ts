import { Run } from "../models";
import { RequestHandler } from "express";

export const getRunItemList: RequestHandler = async (req, res, next) => {
  let pageNum = parseInt(req.params.pageNum);
  let offset = 0;
  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }
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
        "date",
      ],
      order: [["createdAt", "DESC"]],
      offset: offset,
      limit: 10,
    });
    const countItem = await Run.count();
    console.log("getRunItemList에 countItem", countItem);
    const ItemList = getRunItemListFunc.map((runItem) => {
      const body = runItem.dataValues.body;
      const regex = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g;

      const matches = body.match(regex);
      if (matches) {
        const startIndex = matches[0].indexOf("=");
        const lastIndex = matches[0].indexOf(">");
        matches[0] = matches[0].substring(startIndex + 2, lastIndex - 1);
      }

      console.log("getRunItemList에 matches", matches ? matches[0] : null);
      return {
        ...runItem.dataValues,

        thumbnail: matches
          ? matches[0]
          : "http://localhost:8000/uploads/defaultImg.jpg",
      };
    });

    console.log("getRunItemList에 runItem", ItemList);
    res.json({ ItemList, totalPage: Math.ceil(countItem / 10), countItem });
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

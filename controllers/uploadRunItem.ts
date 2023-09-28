import { RequestHandler } from "express";
import { Run } from "../models";

const uploadRunItem: RequestHandler = async (req, res, next) => {
  try {
    const run = await Run.create({
      start: req.body.start,
      end: req.body.end,
      startLocationNuturalLan: req.body.startLocationNuturalLan,
      endLocationNuturalLat: req.body.endLocationNuturalLat,
      durationTime: req.body.durationTime,
      distance: req.body.distance,
      date: req.body.date,
      user_id: req.user?.user.dataValues.id,
      title: req.body.title,
      body: req.body.body,
      numOfPeople: req.body.numOfPeople,
      name: req.body.name,
    });
    console.log("run컨트롤러에서 찍어봄", run);
    const responseData = {
      runItemId: run.dataValues.runItemId,
    };
    res.json(responseData);
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export default uploadRunItem;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const uploadRunItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const run = yield models_1.Run.create({
            start: req.body.start,
            end: req.body.end,
            startLocationNaturalLan: req.body.startLocationNaturalLan,
            endLocationNaturalLan: req.body.endLocationNaturalLan,
            durationTime: req.body.durationTime,
            distance: req.body.distance,
            date: req.body.date,
            UserId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.dataValues.id,
            title: req.body.title,
            body: req.body.body,
            numberOfPeople: req.body.numberOfPeople,
            name: req.body.name,
        });
        console.log("run 업로드 컨트롤러에서 찍어봄", run);
        const responseData = {
            runItemId: run.dataValues.runItemId,
        };
        res.json(responseData);
        res.end();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.default = uploadRunItem;

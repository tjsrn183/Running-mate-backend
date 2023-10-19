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
exports.getRunItemList = void 0;
const models_1 = require("../models");
const getRunItemList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getRunItemListFunc = yield models_1.Run.findAll({
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
            const regex = /<img[^>]+src="http([^">]+)/g;
            const matches = body.match(regex);
            return Object.assign(Object.assign({}, runItem.dataValues), { body: matches
                    ? matches[0]
                    : "http://localhost:8000/uploads/defaultImg.jpg" });
        });
        console.log("getRunItemList에 runItem", ItemList);
        res.json(ItemList);
        res.end();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getRunItemList = getRunItemList;

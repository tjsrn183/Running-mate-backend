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
    let pageNum = parseInt(req.params.pageNum);
    let offset = 0;
    if (pageNum > 1) {
        offset = 10 * (pageNum - 1);
    }
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
                "date",
            ],
            order: [["createdAt", "DESC"]],
            offset: offset,
            limit: 10,
        });
        const countItem = yield models_1.Run.count();
        const ItemList = getRunItemListFunc.map((runItem) => {
            const body = runItem.dataValues.body;
            const regex = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g;
            const matches = body.match(regex);
            if (matches) {
                const startIndex = matches[0].indexOf("=");
                const lastIndex = matches[0].indexOf(">");
                matches[0] = matches[0].substring(startIndex + 2, lastIndex - 1);
            }
            return Object.assign(Object.assign({}, runItem.dataValues), { thumbnail: matches
                    ? matches[0]
                    : "http://localhost:8000/uploads/defaultImg.jpg" });
        });
        res.json({ ItemList, totalPage: Math.ceil(countItem / 10), countItem });
        res.end();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getRunItemList = getRunItemList;

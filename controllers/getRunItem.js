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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRunItem = void 0;
const models_1 = require("../models");
const user_1 = __importDefault(require("../models/user"));
const getRunItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getRunItemfunc = yield models_1.Run.findOne({
            where: { runItemId: req.params.runItemId },
            include: { model: user_1.default, attributes: ["nick"] },
        });
        console.log("getRunItem에 runItem", getRunItemfunc);
        res.json(getRunItemfunc);
        res.end();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getRunItem = getRunItem;

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
exports.deleteRunItem = void 0;
const models_1 = require("../models");
const services_1 = require("../services");
const deleteRunItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const runItemIdNum = parseInt(req.params.runItemId);
    try {
        const post = yield models_1.Run.destroy({
            where: {
                runItemId: runItemIdNum,
            },
        });
        yield (0, services_1.removeRoom)(runItemIdNum);
        res.end();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteRunItem = deleteRunItem;

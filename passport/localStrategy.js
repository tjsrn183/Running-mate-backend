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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = () => {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: "userId",
        passwordField: "password",
    }, (userId, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exUser = yield user_1.default.findOne({
                where: { user_id: userId },
            });
            console.log("exUser타입 재설정해라", exUser);
            if (exUser) {
                const result = yield bcrypt_1.default.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                }
                else {
                    done(null, false, { message: "비밀번호가 일치하지 않습니다." });
                }
            }
            else {
                done(null, false, { message: "가입되지 않은 회원입니다." });
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    })));
};

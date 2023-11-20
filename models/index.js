"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.ChatRoom = exports.Run = exports.Post = exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
//import { Sequelize } from "sequelize-typescript";
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const post_1 = __importDefault(require("./post"));
exports.Post = post_1.default;
const run_1 = __importDefault(require("./run"));
exports.Run = run_1.default;
const chatRoom_1 = __importDefault(require("./chatRoom"));
exports.ChatRoom = chatRoom_1.default;
const chat_1 = __importDefault(require("./chat"));
exports.Chat = chat_1.default;
const config_1 = __importDefault(require("../config/config"));
const env = process.env.NODE_ENV || "development";
const configSet = config_1.default[env];
exports.sequelize = new sequelize_1.Sequelize(configSet.database, configSet.username, configSet.password, {
    host: configSet.host,
    dialect: "mysql",
    port: Number(configSet.port),
});
user_1.default.initiate(exports.sequelize);
post_1.default.initiate(exports.sequelize);
run_1.default.initiate(exports.sequelize);
chatRoom_1.default.initiate(exports.sequelize);
chat_1.default.initiate(exports.sequelize);
user_1.default.associate();
post_1.default.associate();
run_1.default.associate();
chatRoom_1.default.associate();
chat_1.default.associate();

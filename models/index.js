"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Run = exports.Post = exports.User = exports.sequelize = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const post_1 = __importDefault(require("./post"));
exports.Post = post_1.default;
const run_1 = __importDefault(require("./run"));
exports.Run = run_1.default;
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
exports.sequelize = new sequelize_1.default.Sequelize(config.database, config.username, config.password, config);
user_1.default.initiate(exports.sequelize);
post_1.default.initiate(exports.sequelize);
run_1.default.initiate(exports.sequelize);
user_1.default.associate();
post_1.default.associate();
run_1.default.associate();

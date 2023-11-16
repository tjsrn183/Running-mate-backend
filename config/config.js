"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dialect = "mysql";
const config = {
    development: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD || "",
        database: "running_mate",
        host: "127.0.0.1",
        dialect: dialect,
    },
    test: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD || "",
        database: "database_test",
        host: "127.0.0.1",
        dialect: dialect,
    },
    production: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD || "",
        database: "running_mate_production",
        host: "127.0.0.1",
        dialect: dialect,
    },
};
module.exports = config;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dialect = "mysql";
const config = {
    development: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.SEQUELIZE_PASSWORD || "",
        database: process.env.DB_DATABASE || "running_mate",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: dialect,
        port: process.env.DB_PORT || "3306",
    },
    test: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.SEQUELIZE_PASSWORD || "",
        database: process.env.DB_DATABASE || "database_test",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: dialect,
        port: process.env.DB_PORT || "3306",
    },
    production: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.SEQUELIZE_PASSWORD || "",
        database: process.env.DB_DATABASE || "running_mate_production",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: dialect,
        port: process.env.DB_PORT || "3306",
    },
};
module.exports = config;

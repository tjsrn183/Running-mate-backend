import dotenv from "dotenv";
dotenv.config();

import { Dialect } from "sequelize";

const dialect: Dialect = "mysql";

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
    port: 8001,
    dialect: dialect,
  },
};
module.exports = config;

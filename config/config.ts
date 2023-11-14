import { Dialect } from "sequelize";

import dotenv from "dotenv";
dotenv.config();

const dialect: Dialect = "mysql";
const config = {
  development: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "running_mate",
    host: "127.0.0.1",
    dialect: dialect,
  },
  test: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "database_test",
    host: "127.0.0.1",
    dialect: dialect,
  },
  production: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "database_production",
    host: "127.0.0.1",
    dialect: dialect,
  },
};

export default config;

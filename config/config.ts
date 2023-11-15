import dotenv from "dotenv";
dotenv.config();

import { Dialect } from "sequelize";

interface Config {
  development: {
    username: string;
    password: string | undefined; // 타입스크립트에서 process.env는 string | undefined로 정의됩니다.
    database: string;
    host: string;
    dialect: Dialect;
  };
  test: {
    username: string;
    password: string | undefined;
    database: string;
    host: string;
    dialect: Dialect;
  };
  production: {
    username: string;
    password: string | undefined;
    database: string;
    host: string;
    dialect: Dialect;
  };
}

const config: Config = {
  development: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD || "",
    database: "running_mate",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD || "",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD || "",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

export default config;

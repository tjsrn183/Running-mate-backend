import Sequelize from "sequelize";
import User from "./user";
import Post from "./post";

const env = (process.env.NODE_ENV as "production" | "test") || "development";
const config = require(__dirname + "/../config/config.json")[env];

export const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

User.initiate(sequelize);

Post.initiate(sequelize);

User.associate();
Post.associate();

export { User, Post };

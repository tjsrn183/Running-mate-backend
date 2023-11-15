import Sequelize from "sequelize";
import User from "./user";
import Post from "./post";
import Run from "./run";
import ChatRoom from "./chatRoom";
import Chat from "./chat";
import configObj from "../config/config";
const env = (process.env.NODE_ENV as "production" | "test") || "development";
const config: any = configObj[env];

export const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

User.initiate(sequelize);
Post.initiate(sequelize);
Run.initiate(sequelize);
ChatRoom.initiate(sequelize);
Chat.initiate(sequelize);

User.associate();
Post.associate();
Run.associate();
ChatRoom.associate();
Chat.associate();

export { User, Post, Run, ChatRoom, Chat };

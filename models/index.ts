import { Sequelize } from "sequelize";
//import { Sequelize } from "sequelize-typescript";
import User from "./user";
import Post from "./post";
import Run from "./run";
import ChatRoom from "./chatRoom";
import Chat from "./chat";
import config from "../config/config";
const env = (process.env.NODE_ENV as "production" | "test") || "development";
const configSet: any = config[env];

export const sequelize = new Sequelize(
  configSet.database,
  configSet.username,
  configSet.password,
  { host: configSet.host, dialect: "mysql" }
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

import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ForeignKey,
} from "sequelize";
import User from "./user";
import { time, timeStamp } from "console";

class ChatRoom extends Model<
  InferAttributes<ChatRoom>,
  InferCreationAttributes<ChatRoom>
> {
  declare title: string;
  declare max: number;
  declare owner: string;
  declare roomId: CreationOptional<Number>;
  declare createdAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    ChatRoom.init(
      {
        roomId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        max: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        owner: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "ChatRoom",
        tableName: "chatRooms",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate() {
    ChatRoom.belongsTo(User, { foreignKey: "user_id" });
  }
}

export default ChatRoom;

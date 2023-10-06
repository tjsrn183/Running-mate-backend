import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
  Model,
} from "sequelize";
import ChatRoom from "./chatRoom";

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare roomId: ForeignKey<ChatRoom["roomId"]>;
  declare user: string;
  declare message: string;
  declare createdAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Chat.init(
      {
        roomId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        message: {
          type: Sequelize.STRING(100),
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
        underscored: false,
        modelName: "Chat",
        tableName: "chats",
        timestamps: false,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate() {
    Chat.belongsTo(ChatRoom);
  }
}

export default Chat;

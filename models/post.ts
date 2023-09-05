import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import User from "./user";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare content: string;
  declare createAt: CreationOptional<Date>;
  declare updateAt: CreationOptional<Date>;
  declare title: string;
  declare name: string;
  declare user_id: number;

  static initiate(sequelize: Sequelize.Sequelize) {
    Post.init(
      {
        name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        createAt: Sequelize.DATE,
        updateAt: Sequelize.DATE,
      },

      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate() {
    Post.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
  }
}
export default Post;

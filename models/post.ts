import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import User from "./user";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare createAt: CreationOptional<Date>;
  declare updateAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Post.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
    Post.belongsTo(User);
  }
}
export default Post;

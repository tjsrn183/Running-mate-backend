import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ForeignKey,
} from "sequelize";
import User from "./user";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare content: string;
  declare postId: CreationOptional<number>;
  declare createAt: CreationOptional<Date>;
  declare updateAt: CreationOptional<Date>;
  declare title: string;
  declare name: string;
  declare UserId: ForeignKey<User["id"]>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Post.init(
      {
        postId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(30),
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
    Post.belongsTo(User);
  }
}
export default Post;

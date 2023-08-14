import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import Post from "./post";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare user_id: CreationOptional<number>;
  declare nick: string;
  declare sex: CreationOptional<String>;
  declare phoneNumber: CreationOptional<string>;
  declare name: CreationOptional<string>;
  declare birthday: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare provider: CreationOptional<string>;
  declare snsId: CreationOptional<string>;
  declare createAt: CreationOptional<Date>;
  declare updateAt: CreationOptional<Date>;
  declare deleteAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        birthday: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        sex: {
          type: Sequelize.ENUM("male", "female"),
          allowNull: true,
        },
        phoneNumber: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        createAt: Sequelize.DATE,
        updateAt: Sequelize.DATE,
        deleteAt: Sequelize.DATE,
      },

      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate() {
    User.hasMany(Post);
  }
}

export default User;

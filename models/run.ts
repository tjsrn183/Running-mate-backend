import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
  Model,
} from "sequelize";
import User from "./user";
import ChatRoom from "./chatRoom";

class Run extends Model<InferAttributes<Run>, InferCreationAttributes<Run>> {
  declare runItemId: CreationOptional<number>;
  declare UserId: ForeignKey<User["id"]>;
  declare createAt: CreationOptional<Date>;
  declare updateAt: CreationOptional<Date>;
  declare start: {};
  declare end: {};
  declare startLocationNaturalLan: string;
  declare endLocationNaturalLan: string;
  declare durationTime: number;
  declare distance: number;
  declare date: string;
  declare title: string;
  declare body: string;
  declare numberOfPeople: number;
  declare name: string;

  static initiate(sequelize: Sequelize.Sequelize) {
    Run.init(
      {
        runItemId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING(10), allowNull: false },
        start: { type: Sequelize.JSON, allowNull: false },
        end: { type: Sequelize.JSON, allowNull: false },
        startLocationNaturalLan: { type: Sequelize.STRING, allowNull: false },
        endLocationNaturalLan: { type: Sequelize.STRING, allowNull: false },
        durationTime: { type: Sequelize.INTEGER, allowNull: false },
        distance: { type: Sequelize.INTEGER, allowNull: false },
        date: { type: Sequelize.STRING, allowNull: false },
        title: { type: Sequelize.STRING, allowNull: false },
        body: { type: Sequelize.TEXT, allowNull: false },
        numberOfPeople: { type: Sequelize.INTEGER, allowNull: false },
        createAt: Sequelize.DATE,
        updateAt: Sequelize.DATE,
      },

      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Run",
        tableName: "Runs",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate() {
    Run.belongsTo(User, { onDelete: "cascade" });
    Run.hasOne(ChatRoom);
  }
}
export default Run;

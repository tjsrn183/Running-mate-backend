import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import User from "./user";

class Run extends Model<InferAttributes<Run>, InferCreationAttributes<Run>> {
  declare runItemId: CreationOptional<number>;
  declare user_id: CreationOptional<number>;
  declare createAt: CreationOptional<Date>;
  declare updateAt: CreationOptional<Date>;
  declare start: {};
  declare end: {};
  declare startLocationNuturalLan: string;
  declare endLocationNuturalLat: string;
  declare durationTime: number;
  declare distance: number;
  declare date: string;
  declare title: string;
  declare body: string;
  declare numOfPeople: number;

  static initiate(sequelize: Sequelize.Sequelize) {
    Run.init(
      {
        runItemId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: { type: Sequelize.INTEGER, allowNull: false },
        start: { type: Sequelize.JSON, allowNull: false },
        end: { type: Sequelize.JSON, allowNull: false },
        startLocationNuturalLan: { type: Sequelize.STRING, allowNull: false },
        endLocationNuturalLat: { type: Sequelize.STRING, allowNull: false },
        durationTime: { type: Sequelize.INTEGER, allowNull: false },
        distance: { type: Sequelize.INTEGER, allowNull: false },
        date: { type: Sequelize.STRING, allowNull: false },
        title: { type: Sequelize.STRING, allowNull: false },
        body: { type: Sequelize.STRING, allowNull: false },
        numOfPeople: { type: Sequelize.INTEGER, allowNull: false },
        createAt: { type: Sequelize.DATE, allowNull: false },
        updateAt: { type: Sequelize.DATE, allowNull: false },
      },

      {
        sequelize,
        timestamps: false,
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
    Run.belongsTo(User, { foreignKey: "user_id" });
  }
}
export default Run;

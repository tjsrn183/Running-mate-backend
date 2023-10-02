"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const user_1 = __importDefault(require("./user"));
class Run extends sequelize_1.Model {
    static initiate(sequelize) {
        Run.init({
            runItemId: {
                type: sequelize_1.default.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: sequelize_1.default.STRING(10), allowNull: false },
            user_id: { type: sequelize_1.default.INTEGER, allowNull: false },
            start: { type: sequelize_1.default.JSON, allowNull: false },
            end: { type: sequelize_1.default.JSON, allowNull: false },
            startLocationNaturalLan: { type: sequelize_1.default.STRING, allowNull: false },
            endLocationNaturalLan: { type: sequelize_1.default.STRING, allowNull: false },
            durationTime: { type: sequelize_1.default.INTEGER, allowNull: false },
            distance: { type: sequelize_1.default.INTEGER, allowNull: false },
            date: { type: sequelize_1.default.STRING, allowNull: false },
            title: { type: sequelize_1.default.STRING, allowNull: false },
            body: { type: sequelize_1.default.TEXT, allowNull: false },
            numberOfPeople: { type: sequelize_1.default.INTEGER, allowNull: false },
            createAt: sequelize_1.default.DATE,
            updateAt: sequelize_1.default.DATE,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Run",
            tableName: "Runs",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate() {
        Run.belongsTo(user_1.default, { foreignKey: "user_id", targetKey: "id" });
    }
}
exports.default = Run;

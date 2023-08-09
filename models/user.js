"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
class User extends sequelize_1.default.Model {
    static initiate(sequelize) {
        User.init({
            email: {
                type: sequelize_1.default.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: sequelize_1.default.STRING(15),
                allowNull: false,
            },
            password: {
                type: sequelize_1.default.STRING(100),
                allowNull: true,
            },
            provider: {
                type: sequelize_1.default.ENUM("local", "kakao"),
                allowNull: false,
                defaultValue: "local",
            },
            snsId: {
                type: sequelize_1.default.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "User",
            tableName: "users",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        db.User.hasMany(db.Post);
    }
}

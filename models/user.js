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
const post_1 = __importDefault(require("./post"));
const run_1 = __importDefault(require("./run"));
const chatRoom_1 = __importDefault(require("./chatRoom"));
class User extends sequelize_1.Model {
    static initiate(sequelize) {
        User.init({
            email: {
                type: sequelize_1.default.STRING(40),
                allowNull: true,
            },
            id: {
                type: sequelize_1.default.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: sequelize_1.default.STRING(40),
                allowNull: true,
                unique: true,
            },
            name: {
                type: sequelize_1.default.STRING(30),
                allowNull: true,
            },
            birthday: {
                type: sequelize_1.default.STRING(10),
                allowNull: true,
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
            },
            sex: {
                type: sequelize_1.default.ENUM("male", "female"),
                allowNull: true,
            },
            phoneNumber: {
                type: sequelize_1.default.STRING(20),
                allowNull: true,
            },
            snsId: {
                type: sequelize_1.default.STRING(30),
                allowNull: true,
            },
            createAt: sequelize_1.default.DATE,
            updateAt: sequelize_1.default.DATE,
            deleteAt: sequelize_1.default.DATE,
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
    static associate() {
        User.hasMany(post_1.default, { foreignKey: "user_id", sourceKey: "id" });
        User.hasMany(run_1.default, { foreignKey: "user_id", sourceKey: "id" });
        User.hasMany(chatRoom_1.default, { foreignKey: "user_id", sourceKey: "id" });
    }
}
exports.default = User;

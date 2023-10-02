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
const chat_1 = __importDefault(require("./chat"));
class ChatRoom extends sequelize_1.Model {
    static initiate(sequelize) {
        ChatRoom.init({
            roomId: {
                type: sequelize_1.default.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: sequelize_1.default.STRING(20),
                allowNull: false,
            },
            max: {
                type: sequelize_1.default.INTEGER,
                allowNull: false,
            },
            owner: {
                type: sequelize_1.default.STRING(20),
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.default.DATE,
                allowNull: false,
                defaultValue: sequelize_1.default.NOW,
            },
            user_id: {
                type: sequelize_1.default.NUMBER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: "ChatRoom",
            tableName: "chatRooms",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate() {
        ChatRoom.belongsTo(user_1.default, { foreignKey: "user_id", targetKey: "id" });
        ChatRoom.hasOne(chat_1.default, { foreignKey: "roomId", sourceKey: "roomId" });
    }
}
exports.default = ChatRoom;

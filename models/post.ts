import Sequelize from "sequelize";

class Post extends Sequelize.Model {
  static initiate(sequelize: Sequelize.Sequelize) {
    Post.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
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
  static associate(db: any) {
    db.Post.belongsTo(db.User);
  }
}

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "user",
      });
    }
  }

  Post.init(
    {
      name: DataTypes.STRING, // <—— TAMBAHKAN INI
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  return Post;
};

"use strict";

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        User.hasMany(models.Task)
      }
    }
  });

  return User;
};

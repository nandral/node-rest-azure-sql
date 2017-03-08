"use strict";
const STATUS_ENUMS = ['OPEN', 'ASSIGNED', 'STARTED', 'CLOSED'];
module.exports = function (sequelize, DataTypes) {
  const entityDefn = {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    title: DataTypes.STRING,
    durationInMins: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: STATUS_ENUMS,
      allowNull: false,
      validate: {
        isValidStatus: (value) => {
          const validEnumSet = new Set(STATUS_ENUMS);
          if (!validEnumSet.has(value)) {
            throw new Error(`Invalid status. Task status should be one of ${STATUS_ENUMS}`)
          } else {
            //console.log('status is valid .... insert data')
          }
        }
      }
      // defaultValue:'OPEN'
    }
  };

  const entityOptions = {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        Task.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  };

  const Task = sequelize.define("Task", entityDefn, entityOptions);

  return Task;
};

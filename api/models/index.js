"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require(path.join(__dirname, '../..', 'db.config.json'))[process.env.NODE_ENV];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && !file.includes("test.js");
  })
  .forEach(function (file) {
    const model = sequelize.import (path.join(__dirname, file));
    db[model.name] = model;
  });

Object
  .keys(db)
  .forEach(function (modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });

db.sequelize = sequelize;

module.exports = db;

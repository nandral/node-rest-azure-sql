'use strict';

let assert = require('assert');

describe('Task Tests', () => {
  let User = null;
  let Task = null;
  let firstUserId = null;
  before(() => {
    return require('./')
      .sequelize
      .sync({force: true});
  });

  beforeEach(() => {
    User = require('./').User;
    Task = require('./').Task;
  });

  it('create User', () => {
    return User
      .create({username: "NIR", city: "SYD"})
      .then((user) => {
        assert.ok(user, "User should be created");
        assert.ok(user.dataValues._id, "Created user should return _id as key");
        firstUserId = user._id
      });
  });

  it('add Task to the user', () => {
    let task = {
      title: "T-1",
      durationInMins: "30",
      status: "OPEN",
      UserId: firstUserId
    };
    return Task
      .create(task)
      .then((task) => {
        assert.ok(task, "Task should be added to user");
        assert.ok(task.dataValues._id, "Created user should return _id as key");
      });
  });

  it('add Task to the user should fail with invalid status', () => {
    let task = {
      title: "T-1",
      durationInMins: "30",
      status: "JUNK",
      UserId: firstUserId
    };
    return Task
      .create(task)
      .then((task) => {
        assert.ok(task, "Task should be added to user");
        assert.ok(task.dataValues._id, "Created user should return _id as key");
      })
      .catch((err) => {
        assert.equal(err.message.includes("Invalid status"), true, "Should fail with invalid status");
      });
  });

});

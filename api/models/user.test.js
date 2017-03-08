'use strict';

var assert = require('assert');
var expect = require('expect.js');

describe('User Tests', () => {
  let User = null;
  let Task = null;
  let firstUserId = null;
  before(() => {
    return require('./')
      .sequelize
      .sync({force:true});
  });

  beforeEach(() => {
    User = require('./').User;
    Task = require('./').Task;
  });

  it('findAll before create', () => {
    return User
      .findAll()
      .then((users) => {
        console.log(users.length);
        assert.equal(users.length, 0, "Number of Users before create should be Zero");
      });
  });

  it('create User', () => {
    return User
      .create({username: "NIR", city: "SYD"})
      .then((user) => {
        assert.ok(user, "User should be created");
        assert.ok(user.dataValues._id, "Created user should return _id as key");
      });
  });

  it('findAll after creating one User', () => {
    return User
      .findAll()
      .then((users) => {
        assert.equal(users.length, 1, "Number of Users before create should be Zero");
        firstUserId = users[0]._id
      });
  });

  it('findOne using userId', () => {
    return User.findOne({
      where: {
        _id: firstUserId
      },
      include: [Task]
    }).then((user) => {
      assert.ok(user, "User should be returned");
      assert.equal(user.Tasks.length,0,"No Tasks should be returned");
    });
  });

});

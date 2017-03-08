'use strict';

var expect = require('expect.js');

describe('models/task', function () {
  before(function () {
      return require('../../api/models').sequelize.sync();
  });

  beforeEach(function () {
    this.User = require('../../api/models').User;
    this.Task = require('../../api/models').Task;
  });

  describe('create', function () {
    it('creates a task', function () {
      return this.User.create({ username: 'johndoe' }).bind(this).then(function (user) {
        return this.Task.create({ title: 'a title', UserId: user._id,status:"OPEN" }).then(function (task) {
          expect(task.title).to.equal('a title');
        });
      });
    });
  });

  describe('create User', () => {
    it('creates a task', () => {
      // return this.User.create({ username: 'johndoe' }).bind(this).then(function (user) {
      //   return this.Task.create({ title: 'a title', UserId: user._id,status:"OPEN" }).then(function (task) {
      //     expect(task.title).to.equal('a title');
      //   });
      // });
    });
  });
});

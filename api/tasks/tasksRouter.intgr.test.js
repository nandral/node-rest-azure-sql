'use strict';

let app      = require('../app');
let assert   = require('assert');
let request  = require('supertest');

describe('Tasks Router Integration Tests', () => {
  let firstUserId = null;
  before(() =>{
      return require('../models').sequelize.sync({force:true});
  });

  it('Create User',  (done) => {
    let user = {username: "NIR", city: "SYD"};
    request(app).post('/api/users/create').send(user).expect(200).end((err,data)=>{
      assert.ok(data.body);
      assert.ok(data.body._id,"User should be created with _id as key");
      firstUserId=data.body._id;
      done();
    });
  });

  it('User should not have nay tasks', (done)=>{
    request(app).get(`/api/users/${firstUserId}`).expect(200).end((err,data)=>{
      assert.ok(data.body);
      assert.equal(data.body.Tasks.length,0,"Number of Tasks for the user should be Zero");
      done();
    });
  });


  it('Add task to user',  (done) => {
    let task = {
      title: "T-1",
      durationInMins: "30",
      status: "OPEN",
      UserId: firstUserId
    };

    request(app).post(`/api/users/${firstUserId}/tasks/create`).send(task).expect(200).end((err,data)=>{
      assert.ok(data.body._id);
      done();
    });
  });

  it('User should not have nay tasks', (done)=>{
    request(app).get(`/api/users/${firstUserId}`).expect(200).end((err,data)=>{
      assert.ok(data.body);
      assert.equal(data.body.Tasks.length,1,"Should return one Task for the user");
      done();
    });
  });




});

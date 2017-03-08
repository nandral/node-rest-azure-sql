'use strict';

let app      = require('../app');
let assert   = require('assert');
let request  = require('supertest');

describe('UserRouter Integration Tests', () => {
  let firstUserId = null;
  before(() =>{
      return require('../models').sequelize.sync({force:true});
  });

  it('Get all users before creating any user',  (done) => {
    request(app).get('/api/users').expect(200).end((err,data)=>{
      assert.equal(data.body.length,0,"Number of User records should be Zero");
      done();
    });
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

  it('Get all users after creating a user',  (done) => {
    request(app).get('/api/users').expect(200).end((err,data)=>{
      assert.equal(data.body.length,1,"Number of User records should be Zero");
      done();
    });
  });

  it('Get user using firstUserId', (done)=>{
    request(app).get(`/api/users/${firstUserId}`).expect(200).end((err,data)=>{
      assert.ok(data.body);
      assert.equal(data.body.Tasks.length,0,"Number of Tasks for the user should be Zero");
      done();
    });

  });

});

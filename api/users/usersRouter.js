const models = require('../models');
const express = require('express');
const router = express.Router();
const debug = require('debug')('REST-SQLZ');

router.post('/create', function (req, res) {
  models
    .User
    .create({username: req.body.username, city: req.body.city})
    .then(function (data) {
      let usrRtn = data.toJSON();
      res.status(201);
      res.send(usrRtn);
    });
});

router.get('/', (req, res) => {
  models
    .User
    .findAll({
      include: [models.Task]
    })
    .then(function (users) {
      const returnUsers = [];
      users.forEach(function (element, index, array) {
        let userRtn = Object.assign({}, {
          _type: "User"
        }, element.toJSON());
        //Add self links, task links
        userRtn.links = {};
        userRtn.links.self = 'http://' + req.headers.host + '/api/users/' + userRtn._id
        userRtn.Tasks = prepareTasksForUser(req, userRtn.Tasks);
        returnUsers.push(userRtn);
      });
      res.status(200);
      res.json(returnUsers);
    });
});

router.get('/:user_id', function (req, res) {
  models
    .User
    .findOne({
      attributes: [
        '_id', 'username', 'city'
      ],
      where: {
        _id: req.params.user_id
      },
      include: [models.Task]

    })
    .then(function (user) {
      if (user) {
        let userRtn = Object.assign({}, {
          _type: "User"
        }, user.toJSON());
        //Add self links, task links
        userRtn.links = {};
        let allUsers = 'http://' + req.headers.host + '/api/users/';
        userRtn.links.allUsers = allUsers.replace(' ', '%20');
        userRtn.Tasks = prepareTasksForUser(req, userRtn.Tasks);
        res.status(200);
        res.json(userRtn)
      } else {
        res.json({err: "Validation Error : Invalid UserId"})
      }
    })
    .catch(err => {
      res.json({err: err.message})
    });;
});

const prepareTasksForUser = (req, tasks) => {
  let tasksWithLinks = [];
  for (let task of tasks) {
    let taskRtn = Object.assign({}, {
      _type: "Task"
    }, task)
    taskRtn.links = {};
    let self = 'http://' + req.headers.host + '/api/users/' + task.UserId + '/tasks/' + task._id;
    taskRtn.links.self = self.replace(' ', '%20');
    tasksWithLinks.push(taskRtn)
  }
  return tasksWithLinks;
}

router
  .get('/:user_id/destroy', function (req, res) {
    models
      .User
      .destroy({
        where: {
          _id: req.params.user_id
        }
      })
      .then(function () {
        res
          .status(204)
          .send('Removed');
      });
  });

module.exports = router;

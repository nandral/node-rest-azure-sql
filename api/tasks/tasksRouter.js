const models = require('../models');
const express = require('express');
const router = express.Router();
const debug = require('debug')('REST-SQLZ');

router.post('/create', function (req, res) {
  let task = {
    title: req.body.title,
    // completed: req.body.completed,
    durationInMins: req.body.durationInMins,
    status: req.body.status,
    UserId: req.body.user_id
  };

  models
    .Task
    .create(task)
    .then((dbRes) => {
      let data = dbRes.toJSON();
      res.status(201)
      res.json(data);
    })
    .catch(err => {
      res.json({err: err.message})
    });
});

router.get('/:task_id', (req, res) => {
  models
    .Task
    .findOne({
      where: {
        _id: req.params.task_id
      }
    })
    .then((task) => {
      if (task) {
        let taskRtn = Object.assign({}, {
          _type: "Task"
        }, task.toJSON());
        taskRtn.links = {};
        let user = 'http://' + req.headers.host + '/api/users/' + taskRtn.UserId;
        taskRtn.links.user = user.replace(' ', '%20');
        res.status(200)
        res.json(taskRtn);
      } else {
        res.json({err: "Validation Error : Invalid Task Id"})
      }
    })
    .catch(err => {
      res.json({err: err.message})
    });
});

router.get('/:task_id/destroy', function (req, res) {
  models
    .Task
    .destroy({
      where: {
        _id: req.params.task_id
      }
    })
    .then(function () {
      res
        .status(204)
        .send('Removed');
    });
});

module.exports = router;

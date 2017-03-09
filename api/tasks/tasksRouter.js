const models = require('../models');
const express = require('express');
const router = express.Router();
const debug = require('debug')('REST-SQLZ');

const Task = models.Task;
const User = models.User;


router.post('/create', function (req, res) {
  let task = {
    title: req.body.title,
    // completed: req.body.completed,
    durationInMins: req.body.durationInMins,
    status: req.body.status,
    // UserId: req.body.user_id
  };

  Task.create(task)
    .then((dbRes) => {
      let data = dbRes.toJSON();
      res.status(201);
      res.json(data);
    }).catch(err => {
    res.json({err: err.message})
  });
});

router.get('/', (req, res) => {
  Task.findAll()
    .then((tasks) => {
      let tasksRtn = [];
      if (tasks && tasks.length > 0) {
        for (let task of tasks) {
          if (task) {
            let taskRtn = Object.assign({}, {_type: "Task"}, task.toJSON());
            taskRtn.UserId = task.UserId ? task.UserId : "NOT_ASSIGNED";
            taskRtn.links = {};
            taskRtn.links.self = `http://${req.headers.host}/api/tasks/${task._id}`;
            taskRtn.links.user = task.UserId ? `http://${req.headers.host}/api/users/${taskRtn.UserId}` : "NOT_ASSIGNED";
            tasksRtn.push(taskRtn);
          }
        }
      }
      res.status(200)
      res.json(tasksRtn);
    })
    .catch(err => {
      res.json({err: err.message})
    });
});

router.get('/:task_id', (req, res) => {
  Task.findOne({where: {_id: req.params.task_id}})
    .then((task) => {
      if (task) {
        let taskRtn = Object.assign({}, {_type: "Task"}, task.toJSON());
        taskRtn.UserId = task.UserId ? task.UserId : "NOT_ASSIGNED";
        taskRtn.links = {};
        taskRtn.links.user = task.UserId ? `http://${req.headers.host}/api/users/${taskRtn.UserId}` : "NOT_ASSIGNED";
        taskRtn.links.allTasks = `http://${req.headers.host}/api/tasks/`;
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

// router.put('/:task_id/assign', (req, res) => {
//   Task.findOne({where: {_id: req.params.task_id}})
//     .then( (task)=>{
//       if(!task) return res.json({result: "Invalid task_id"});
//       User.findOne({where: {_id: req.body.user_id}})
//         .then((user)=>{
//           if(!user) return res.json({result: "Invalid user_id"});
//           return res.json({result: true});
//         })
//     })
//     // .catch((err)=>res.json({err}));
// });

router.put('/:task_id/assign', (req, res) => {
  const task_id = req.params.task_id;
  const user_id = req.body.user_id;
  Promise.all([validateTask(task_id), validateUser(user_id)])
    .then(() => {
      Task.update({status: "ASSIGNED", UserId:user_id}, {where: {_id: task_id}})
        .then((result) => {
          res.json({result:`Task ${task_id} assigned to User ${user_id}`});
        })
        .catch((err) => res.json(err));

    })
    .catch((err) => res.json(err));
});

router.put('/:task_id/unassign', (req, res) => {
  const task_id = req.params.task_id;
  const user_id = req.body.user_id;

  Promise.all([validateTask(task_id), validateUser(user_id)])
    .then(() => {
      Task.update({status: "OPEN", UserId: null}, {where: {_id: req.params.task_id}})
        .then((result) => {
          res.json({result:`Task ${task_id} is OPEN and not assigned to any User`});
        })
        .catch((err) => res.json(err));

    })
    .catch((err) => res.json(err));
});

const validateUser = (user_id) => {
  return new Promise((resolve, reject) => {
    User.findOne({where: {_id: user_id}})
      .then((user) => {
        user ? resolve() : reject({err: "Invalid user_id"})
      })
      .catch((err) => reject(err));
  });
}

const validateTask = (task_id) => {
  return new Promise((resolve, reject) => {
    Task.findOne({where: {_id: task_id}})
      .then((task) => {
        task ? resolve() : reject({err: "Invalid task_id"})
      })
      .catch((err) => reject(err));
  });
}


router.get('/:task_id/destroy', function (req, res) {
  Task.destroy({
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

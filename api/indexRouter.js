const models = require('./models');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.status(200);
  res.json({
    title: 'RESTful API built on Hypermedia architecture',
    desc:"Explore the data using RESTful API using the Hypermedia links without UI :-)",
    backend:"Node with Express",
    database:"Azure SQL",
    ORM:"SequelizeJS",
    dataLinks:{
      users: 'http://' + req.headers.host + '/api/users/'
    }
  });

});

module.exports = router;

const express = require('express'),
  app = express(),
  Sequelize = require('sequelize'),
  port = process.env.PORT || 8080;

var sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Or you can simply use a connection uri
var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

app.use('/', (req, res) => {
  res.send('Cest la route !!!!');
}).listen(port, (req, res) => {
  console.log('Server is Ok. Listening port ', port);
});

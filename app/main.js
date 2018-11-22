
const enviroment = require('./../environment');
const express = require('express');
const app = express();
const birds = require('../routes/birds');

app.use('/birds', birds);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(enviroment.httpPort, function () {
  console.log(`Example app listening on port ${enviroment.httpPort}!`);
});

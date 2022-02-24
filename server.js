import TuitController from "./controllers/TuitController";

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tuiter');


app.get('/hello', (req, res) =>
  res.send('Hello World!'));

require('controllers/TuitController')(app);
require('controllers/UserController')(app);

console.log("uh oh");
const PORT = 4000;
app.listen(PORT);

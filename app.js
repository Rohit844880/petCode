const express = require('express');

const routes = require('./routes');
const app = express();

app.use(express.json({ limit: '100kb' }));
const { ValidationError, NotFoundError } = require('./lib/errors');
const http=require('http');

var port=process.env.PORT || 3000;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp');

var server=http.createServer(app);

server.listen(port,() => {
    console.log(`server is listening to port ${port}`)
});


app.use('/', routes);
app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});

module.exports = app; 
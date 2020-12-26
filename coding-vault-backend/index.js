var pyRouter = require('./routes/pyRouter');
var cRouter = require('./routes/cRouter');
var cppRouter = require('./routes/cppRouter');
var javaRouter = require('./routes/javaRouter');
var jsRouter = require('./routes/javaScriptRouter');
const path = require("path");

const express = require('express'),
     http = require('http');

const hostname = 'localhost';
const port = process.env.PORT || 3443;

const app = express();
/*app.use('/', (req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});*/
app.use(express.static(path.join(__dirname, 'build')));
//app.use(express.static("public"));
app.use('/py', pyRouter);
app.use('/c', cRouter);
app.use('/cpp', cppRouter);
app.use('/java', javaRouter);
app.use('/js', jsRouter);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

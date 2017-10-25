const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express()

var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/TulsaNEM');

var blogSchema = new Schema({
  title:  String,
});

var Blog = mongoose.model('Blog', blogSchema);

app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log("every request prints this...");
  req.user = "This is awesome!";
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})


app.use(function (req, res, next) {
  console.log(req.user);
  next();
})

app.get('/blogs', function (req, res) {
  Blog.find({}, function(err, data) {
    res.send(data);
  });
})


app.post('/blogs', function (req, res) {
  var entry = new Blog(req.body);
  entry.save(function(err, data) {
    if (err) { res.send(err); return; }
    res.send(data);
  });
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

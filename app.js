var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const ytdl = require('ytdl-core');

var indexRouter = require('./routes/index');
var quotesRouter = require('./routes/quotes');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', async (req,res) => {
console.log("ii")
  var URL = req.query.URL;
  //res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  const info = await ytdl.getInfo(URL);
  let format = ytdl.chooseFormat(info.formats, {quality: 'highest'});
  res.set('Content-Type', 'text/html');
  res.send(format.url);
});

app.use('/', indexRouter);

module.exports = app;

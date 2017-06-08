const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// Setup mongodb connection
mongoose.connect('mongodb://localhost:27017/node-fun');
const db = mongoose.connection;

db.on('error', function(error){
  console.log(error);
});

db.once('open', function(){
  console.log('Connecting to mongodb!');
});

// Bring model
let Article = require('./models/article');

// templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "public")));

// routes
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/articles', function(req, res) {
  Article.find(function(err, articles) {
    if(err) return console.error(err);

    res.render('articles', {
      articles: articles
    });
  });
});

app.listen(3000, function() {
  console.log('Server started on port 3000...')
});

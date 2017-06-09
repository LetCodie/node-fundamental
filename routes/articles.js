const express = require('express');
const router = express.Router();

// Bring models
const Article = require('../models/article');

router.get('/', function(req, res) {
  Article.find(function(err, articles) {
    if(err) return console.error(err);

    res.render('articles', {
      articles: articles
    });
  });
});

router.post('/', function(req, res) {
  let newArticle = {
    title: req.body.title,
    body: req.body.body
  }

  Article.create(newArticle, function(err, article) {
    if(err)
      console.log(err);
    else {
      res.redirect('/articles');
    }
  });
});

router.get('/new', function(req, res, next) {
  if(req.params.id != undefined) next();

  res.render('articles/new');
});

router.get('/:id', function(req, res) {
  let query = { _id: req.params.id };

  Article.findById(query, function(err, article) {
    res.render('article', {
      article: article
    });
  });
});

module.exports = router;

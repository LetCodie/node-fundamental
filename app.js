const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "public")));

// routes
app.get('/', function(req, res) {
  res.render('home');
});

app.listen(3000, function() {
  console.log('Server started on port 3000...')
});

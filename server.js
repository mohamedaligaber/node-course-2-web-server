const express = require('express');
var app = express();
const hbs = require('hbs');
const fs = require('fs');


//in this lesson we will go to the entire process from creating new feature to push it to gitHub to push it to heroku
//first : add new features to our code.

//second : "git status" --> check the new changes, "git add ." --> add all files have changes to next commit, "git status" --> check those files added,
//"git commit -m 'add new route called project and it's resources'" -> commit those files to .git folder to be pushed.
//"git push" --> push our code to gitHub Repo. note: "git push" equals "git push origin" which means push our code to gitHub repository not another repo like heroku

//"third" : "git push heroku" , push our code to heroku repo to build and deploy new changes.

const PORT = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));


app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.url}  ${req.method}`;
  fs.appendFileSync('server.log',log);
  console.log(log);
  next();
});

/*
app.use( (req, res, next) => {
  res.render('maintenance.hbs');
});
*/

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase(text);
});

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
    //currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req, res) => {
  //res.send('About page');
  res.render('about.hbs',{
    pageTitle: 'About Page'
    //currentYear: new Date().getFullYear()
  });
});


app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'About Page'
  });
});



app.listen(PORT, () => {
  console.log('Server started successfully on port ',PORT);
});

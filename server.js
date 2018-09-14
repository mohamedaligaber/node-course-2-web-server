const express = require('express');
var app = express();
const hbs = require('hbs');
const fs = require('fs');

//in this lesson we will add our project to github as a git repository, creating that will be by run command "git init" on the our project root directory.
//the repository will be created by adding a hidden directory called ".git" which keeps tracks of our project changes.
//any commands of git must be run on the root directory of our project"6_AddingVersionControl(Git)". or where ".git" directory exists.
//"git status" is a command to show us the current branch, the last commit and the folders and files which git will put in the next commit and the others which git will not add to it's next commit.
//"git add" is a command to add files or directories to next commit process
//.gitignore is a file contians the names of directories and files which git must not keep track of at all, this file must be in the same location of ".git" directory

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



app.listen(3000, () => {
  console.log('Server started successfully on port 3000!');
});

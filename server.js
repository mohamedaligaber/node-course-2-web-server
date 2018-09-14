const express = require('express');
var app = express();
const hbs = require('hbs');
const fs = require('fs');


//heroku is cloud service to deploy our projects, there is a free tier on heroku, we can use heroku CMD to deploy and manage our apps which makes deployment process very easy.
//to downlaod heroku CMD go to "toolbelt.heroku.com", downlaod herkou for your OS and install it, go CMD and type "heroku --help" to insatll heroku CMD and start seeing heroku commands
//"heroku login" coomand to login to my account on heroku. after login now i can interact with heroku sevrer and create Apps and deploy it.
//"heroku keys:add" command to configure SSH keys which we created in the previous lessons with heroku server. "heroku keys" to show the keys, "heroku keys:delete myemail@gmail.com" to delete those keys form heroku server.
//"ssh -v git@heroku.com"to setup the the keys, if this message appeared " Authentication succeeded (publickey)." so the things went fine.

//to run our app on heroku we must specify the port that heroku server work on, heroku server takes this port value from environment variable called "PORT"
//if we run this app on localhost the node.js app will not find PORT environment variable if Port environment variable not exist we will set PORT to 3000.
//process.env is an object which contains all environment variable on the host deployemnt machine.
const PORT = process.env.PORT || 3000;

//we must add element called "start" to the object "script" inside file "package.json", the value of "start" element should be string contains our app deploy command "node server.js"
//because heroku will use this command to run and deploy our app.
//to test and simulate what will happend on heroku server run this command "npm start".

//git status --> to check the files which has changes
//git add .  --> to add all files which has changes to next commit
//git commit -m 'my message' to commit changes  --> to commit our changes to .git folder
//git push  --> to push our commits to the our online repo

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


app.listen(PORT, () => {
  console.log('Server started successfully on port ',PORT);
});

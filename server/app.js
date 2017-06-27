//pulls in express
var express = require('express');
//app is express
var app = express();

//create server to host
var server = require('http').createServer(app);
var path = require('path');

//require express session to authenticate user
var session = require('express-session');

//get parameters from body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//make public folder static so that it can be accessed public
app.use(express.static(path.join(__dirname, 'public')));

//tell express that our views can be found in ./views
app.set('views', path.join(__dirname, 'views'));
//tell express that we are using handlebars as our view engin
app.set('view engine', 'hbs');

//connect to database
require('./db/db.js');

//connect to the model
var User = require('./models/User.js');

app.use(session({
		secret: "shhh, I'm a password",
		resave: false,
		saveUninitialized: true,
		cookie: {secure: false}


}));

//connect to controller
var UserController = require('./controllers/UserController');

app.use('/', UserController);






server.listen(3000, function(){

	console.log("listening on port 3000");
})
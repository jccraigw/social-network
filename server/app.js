//pulls in express
var express = require('express');
//app is express
var app = express();

//create server to host
var server = require('http').createServer(app);
var path = require('path');

//make public folder static so that it can be accessed public
app.use(express.static(path.join(__dirname, 'public')));

//tell express that our views can be found in ./views
app.set('views', path.join(__dirname, 'views'));
//tell express that we are using handlebars as our view engin
app.set('view engine', 'hbs');

//connect to database
require('./db/db.js');

var database = [
	{name: "Justin Graham",index: 0, title: "Consultant", location: "Chicago", image: "", topVenues: ["Bar Deville", "Slipper Slope", "East Room"], friends: [{name: "Julian", index: 1}, {name: "Jeannetta", index: 2}], loggedIn: true, goingOut: true},
	{name: "Julian Graham",index: 1, title: "Student", location: "Chicago", image: "", topVenues: ["Beauty Bar", "Bar Deville", "Slipper Slope"], friends: [{name: "Justin", index: 0}, {name: "Jeannetta", index: 2}],loggedIn: true, goingOut: true},
	{name: "Jeannetta Graham",index: 2, title: "Lawyer", location: "Chicago", image: "", topVenues: ["Bar Deville", "Studio Paris", "Underground"], friends: [{name: "Julian", index: 1}, {name: "Justin", index: 0}],loggedIn: true, goingOut: false}


	]



app.get('/home', function(req, res){

	

	var people = {member: database};

	res.render('home', people);
})

app.get('/profile', function(req, res){

	var index = req.query.id;
	var person = database[index];
	res.render('profile', person);
})

app.get('/join', function(req, res){

	res.render('join');
})


server.listen(3000, function(){

	console.log("listening on port 3000");
})
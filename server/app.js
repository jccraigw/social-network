//pulls in express
var express = require('express');
//app is express
var app = express();

//create server to host
var server = require('http').createServer(app);
var path = require('path');

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


app.get('/', function(req, res){
	User.find(function(err, users){

		var allUsers = {users: users};
		console.log(allUsers);
		res.render('home', allUsers);
	})
	
})

app.get('/profile/:id', function(req, res){

	var id = req.params.id;
	User.findById(id, function(err, users){

		console.log(err);
		res.render('profile', users);
	})
	
})

app.get('/join', function(req, res){

	res.render('join');
})

app.post('/join', function(req, res){

	console.log(req.body);
	var user = new User({
		name: req.body.name,
		title: req.body.title,
		location: req.body.location,
		image: req.body.image,
		venues: req.body.venues,
		friends: req.body.friends,
		logged: req.body.logged,
		going: req.body.going

	})

	user.save();
	res.send('success');
})


app.patch('/profile/:id', function(req, res){

	 var id = req.params.id;
	 User.findById(id, function(err, users){
		users.name = req.body.name;
    	users.title = req.body.title;
    	users.location = req.body.location;
    	users.image = req.body.image;
    	users.venues = req.body.venues;
    	users.friends = req.body.friends;
    	users.logged = req.body.logged;
    	users.going = req.body.going;
    	users.save();
    	res.render('profile', users);
	 })

	

})

app.delete('/', function(req, res){

	

})





server.listen(3000, function(){

	console.log("listening on port 3000");
})
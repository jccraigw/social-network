var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
var currentID;

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req, res){

  res.render('login');
})


router.get('/join', function(req, res){

	res.render('join');
})

router.get('/home', function(req, res){
	User.find(function(err, users){

		var allUsers = {users: users,
						id: currentID
						};
		console.log(allUsers);

		if(req.session.loggedIn === true){
      res.render('home', allUsers);
     }else{

      res.redirect('/');
     }
		
	})
	
})

router.get('/profile/:id', function(req, res){

	var id = req.params.id;
	User.findById(id, function(err, users){

		var currentSession = {users: users,
								id: id}
		console.log(err);
		res.render('profile', currentSession);
	})
	
})

router.post('/join', function(req, res){

	console.log(req.body);

	var password_hash;

	bcrypt.hash(req.body.password, 10, function(error, hash){

    console.log(hash);

    var user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hash,
		title: req.body.title,
		location: req.body.location,
		image: req.body.image,
		venues: req.body.venues,
		friends: req.body.friends,
		logged: req.body.logged,
		going: req.body.going

	})

	user.save();

    

  })

	
	res.redirect('/');
})

router.post('/', function(request, response){

    //1.find the user with the corresponding email address
    //2. check if the password on that user matches the password from the request (hashed)
    //
    User.findOne({email: request.body.email}, function(error, user){

        //check if there is a user that was returned from the DB
        if(user){
          bcrypt.compare(request.body.password, user.password, function(error, match){

            if(match === true){
              request.session.loggedIn = true;
              currentID = user._id;
              console.log(currentID);
              response.redirect('/home');
            }else{

              response.redirect('/');
            }
          })

        }else{

          response.redirect('/');
        }

    })
    
})

router.patch('/profile/:id', function(req, res){

	 var id = req.params.id;
	 User.findById(id, function(err, users){
		users.name = req.body.name;
    	users.title = req.body.title;
    	users.location = req.body.location;
    	users.image = req.body.image;
    	users.venues = req.body.venues;
    	//check if find by property to add ids with name
    	users.friends = req.body.friends;
    	users.logged = req.body.logged;
    	users.going = req.body.going;
    	users.save();
    	res.render('profile', users);
	 })

	

})

router.delete('/profile/:id', function(req, res){

	var id = req.params.id;
  	User.findById(id, function(err, users){
    users.remove();
    res.json("success");
    //need to send to back to home screen after this
  })

})

module.exports = router;
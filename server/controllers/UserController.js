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
//puts error on login page using /error route
router.get('/error', function(req, res){
	var error_message ={error: "hahahah"};

  res.render('login', error_message);
})


router.get('/join', function(req, res){

	res.render('join');
})

router.get('/home', function(req, res){
	User.find(function(err, users){

		var allUsers = {users: users,
						id: currentID,
						loggedIn: true
						};
		//console.log(allUsers);

		if(req.session.loggedIn === true){
      res.render('home', allUsers);
     }else{

      res.redirect('/');
     }
		
	})
	
})

router.get('/profile/:id', function(req, res){

	var id = req.params.id;

	console.log(id);
	console.log(currentID);


	User.findById(id, function(err, users){

		if(id == currentID){

			var isUser = true;
		}else{

			var isUser = false;
		}

		console.log(isUser);
		var currentSession = {users: users,
								id: currentID,
								current: isUser,
							 loggedIn: true}
		console.log(err);
		res.render('profile', currentSession);
	})
	
})

//post request to /logout
router.get('/logout', function(request, response){

  request.session.loggedIn = false;
  response.redirect('/');
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

	res.send("success");
	
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

              response.redirect('/error');
            }
          })

        }else{

          response.redirect('/error');
        }

    })
    
})

router.patch('/profile/:id', function(req, res){

	 var id = req.params.id;
	 // User.findById(id, function(err, users){
		// users.name = req.body.name;
  //   	users.title = req.body.title;
  //   	users.location = req.body.location;
  //   	users.image = req.body.image;
  //   	users.venues = req.body.venues;
  //   	//check if find by property to add ids with name
  //   	users.friends = req.body.friends;
  //   	users.logged = req.body.logged;
  //   	users.going = req.body.going;
  //   	users.save();
  //   	res.render('profile', users);
	 // })

	 var status = req.body.going;

	 console.log(status);
	 User.update({_id: id},{

	 		going: status


	 	}, function(err, affected, res){

	 		console.log(res);
	 	}

	 )

	

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
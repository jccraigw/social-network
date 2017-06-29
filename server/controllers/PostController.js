var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var bodyParser = require('body-parser');
var User = require('../models/User');

var postId;
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', function(request, response){

	//grab the text fromt the request body and save it tas a new review

	var postText = request.body.text;
	console.log(postText);
	var post = new Post({text: postText});
	post.save();
	postId = post.id;
	var userId = request.body.userId;
	console.log("userid: " + userId);
	User.findById(userId, function(error, user){

		
		console.log("post: " + postId);
		user.posts.push(postId);
		user.save();
		response.redirect(request.get('referer'));
	})

	console.log(request.get('referer'));
	
})

router.delete('/:id', function(request, response){

	var id  =  request.params.id;;
	Post.findById(id, function(err, post){
    post.remove();
    response.send("success");
    //need to send to back to home screen after this
  })


})

module.exports = router;
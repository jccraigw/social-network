var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

	name: String,
	email: String,
	password: String,
	title: String,
	location: String,
	image: String,
	venues: Array,
	friends: [{
			id: String,
			name: String
			},
			{
			id: String,
			name: String
			},
			{
			id: String,
			name: String
			}],
	logged: Boolean,
	going: Boolean,
	posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]

});

var userModel = mongoose.model('User', UserSchema);

module.exports = userModel;



var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

	name: String,
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
	going: Boolean

})

var userModel = mongoose.model('User', UserSchema);

module.exports = userModel;

	// {name: "Justin Graham",index: 0, title: "Consultant", location: "Chicago", image: "",
	//  topVenues: ["Bar Deville", "Slipper Slope", "East Room"], friends: [{name: "Julian", index: 1},
	//   {name: "Jeannetta", index: 2}], loggedIn: true, goingOut: true},

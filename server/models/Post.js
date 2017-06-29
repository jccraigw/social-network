var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({

	text: String

});

var postModel = mongoose.model('Post', PostSchema);

module.exports = postModel;
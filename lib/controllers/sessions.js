var mongoose = require('mongoose'),
	Session = mongoose.model('Session'),
	_ = require('underscore');

exports.add = function(sessionId, callback){

	var session = new Session({
		sessionId: sessionId
	});

	session.add(sessionId, function(err, session){
		if (err) {
			//TODO more infomation!!!
			throw new Error(err);
		}
		if(_.isFunction(callback)) callback(sessions);
	});
};

exports.list = function(callback){

	var options = {};

	Session.list(options, function(err, sessions) {
		if (err) {
			//TODO more infomation!!!
			throw new Error(err);
		}
		if(_.isFunction(callback)) callback(sessions);
	});

};
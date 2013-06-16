var mongoose = require('mongoose'),
	db,
	TraceSchema,
	Trace,
	SessionSchema,
	Session,
	_saveTrace;

exports.init = function init() {

	db = mongoose.connect('mongodb://localhost/mitsuruog_node_rabo');

	//スキーマ宣言
	TraceSchema = new mongoose.Schema({
		sessionId: String,
		type: String,
		position: {
			x: Number,
			y: Number
		},
		image: String,
		timestamp: Date
	});

	SessionSchema = new mongoose.Schema({
		sessionId: String,
		createTimestamp: Date
	});

	//スキーマからモデルを生成
	Trace = db.model('trace', TraceSchema);
	Session = db.model('session', SessionSchema);

	return db

};

exports.saveSession = function saveSession(sessionId) {

	var session = new Session();
	session.sessionId = sessionId;
	session.createTimestamp = new Date();

	session.save(function (err) {
		if (err) {
			console.log(err);
			throw new Error('Session情報の保存に失敗しました。' + session);
		}
	});

};

exports.getSessionList = function getSessionList(){

	return db.sessions.find().sort({
		createTimestamp: -1
	});

};

exports.saveMousepoint = function saveMousepoint(sessionId, point) {

	var trace = new Trace();
	trace.sessionId = sessionId;
	trace.type = 'mousepoint';
	trace.position.x = point.x;
	trace.position.y = point.y;
	trace.timestamp = new Date();

	_saveTrace(trace);

};

exports.saveClickpoint = function saveClickpoint(sessionId, point) {

	var trace = new Trace();
	trace.sessionId = sessionId;
	trace.type = 'click';
	trace.position.x = point.x;
	trace.position.y = point.y;
	trace.timestamp = new Date();

	_saveTrace(trace);

};

exports.saveScreenImage = function saveScreenImage(sessionId, image) {

	var trace = new Trace();
	trace.sessionId = sessionId;
	trace.type = 'image';
	trace.image = image;
	trace.timestamp = new Date();

	_saveTrace(trace);

};

_saveTrace = function saveTrace(trace) {

	trace.save(function (err) {
		if (err) {
			console.log(err);
			throw new Error('Trace情報の保存に失敗しました。' + trace);
		}
	});

}
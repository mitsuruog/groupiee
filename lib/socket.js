var sio = require('socket.io'),
	db = require('./db'),
	io,
	mousepointHandler,
	clickHandler,
	imageHandler,
	playHandler,
	_configure;

exports.init = function init(server) {

	io = sio.listen(server);
	_configure();
	return io;

};

exports.traceStart = function traceStart() {

	io.of('/trace').on('connection', function (socket) {

		console.log('connection:' + socket.id);
		db.saveSession(socket.id);

		socket.on('emit.mousepoint', mousepointHandler);
		socket.on('emit.click', clickHandler);
		socket.on('emit.image', imageHandler);
	});

};

exports.playStart = function playStart(){

	io.of('/play').on('connection', function (socket) {

		socket.emit('playList', db.getSessionList());
		socket.on('play', playHandler);

	});

};

mousepointHandler = function mousepointHandler(data) {
	console.log(data);
	db.saveMousepoint(this.id, data);
};

clickHandler = function clickHandler(data) {
	console.log(data);
	db.saveClickpoint(this.id, data);
};

imageHandler = function imageHandler(data) {
	console.log(data);
	db.saveScreenImage(this.id, data);
};

playHandler = function playHandler(data){

	var sessionId = data.sessionId,
		play;

	play = db.findPlay(sessionId);
	this.emit('play', play);

}

_configure = function configure() {

	io.configure('production', function () {

		io.enable('browser client minification');
		io.enable('browser client etag');
		io.set('log level', 1);

		io.set('transports', [
			'websocket',
			'flashsocket',
			'htmlfile',
			'xhr-polling',
			'jsonp-polling',
		]);

	});

	io.configure('development', function () {

		io.set('transports', ['websocket']);

	});

};
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('../routes'),
	ejs = require('ejs'),
	trace = require('../routes/trace'),
	play = require('../routes/play'),
	db = require('./db'),
	http = require('http'),
	path = require('path'),
	fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

//ejs template
console.log(__dirname);
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
ejs.open = '{{';
ejs.close = '}}';

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

//session
//app.use(express.cookieParser('mumble'));
//app.use(express.cookieSession({key: 'tracking'}));
//default maximun128objects, maximun256KB, total32MB
//app.use(express.staticCache());
//app.use(express.directory(path.join(__dirname, 'public')));

//404
//app.use(function (req, res, next) {
//	res.send('Sorry ' + req.url + ' does not exists');
//});

//static files dir
app.use(express.static(path.join(__dirname, '/../public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//routing
app.get('/', routes.index);
app.get('/trace', trace.index);
app.get('/play', play.index);

var server = http.createServer(app).listen(app.get('port'), process.env.IP, function () {
	console.log('Express server listening on port ' + app.get('port'));
});

//db
var mongoose = require('mongoose');

//TODO get by config
mongoose.connect('mongodb://localhost/groupiee');

//TODO do multiple
require(__dirname + '/models/trace');
require(__dirname + '/models/session');

//app.set('db', db.init());
//
//var env = process.env.NODE_ENV || 'development',
//	config = require('../config/config')[env],
//	mongoose = require('mongoose');
//
//// db connection
//console.log(config.db);
//mongoose.connect(config.db);
//
//// init models
//var models_path = __dirname + 'lib/models';
//fs.readdirSync(models_path).forEach(function(file){
//	 if(~file.indexOf('.js')){
//		 console.log(models_path + '/' + file);
//		 require(models_path + '/' + file);
//	 }
//});




//socket.io

var socket = require('./socket');

app.set('io', socket.init(server));
socket.traceStart();
socket.playStart();
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	ejs = require('ejs'),
	trace = require('./routes/trace'),
	play = require('./routes/play'),
	socket = require('./lib/socket'),
	db = require('./lib/db'),
	http = require('http'),
	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

//ejs template
app.set('views', __dirname + '/views');
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
app.use(express.static(path.join(__dirname, 'public')));

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

//socket.io
app.set('io', socket.init(server));
socket.traceStart();
socket.playStart();

//db
app.set('db', db.init());



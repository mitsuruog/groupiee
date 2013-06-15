
/*
 * GET users listing.
 */

var fs = require('fs');

exports.index = function(req, res){

	fs.readFile('./views/trace.html', 'UTF-8', function(err, data) {
		res.writeHead(200, {
			'Content-Type' : 'text/html'
		});
		res.end(data);
	});

//  res.render('index', { title: '監視ページ' });
};
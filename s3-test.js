var http = require('http');

var options = {
	host: '127.0.0.1',
	port: 3000,
	path: '/test',
	method: 'GET',
	headers: {
		Host: 's3.amazonaws.com',
		Date: 'test',
		Authorization: 'test test'
	}
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.end();
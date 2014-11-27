var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var qrCode = require('qrcode-npm');

//qr.createTableTag(4);  // creates a <table> tag as text

app.get('/', function(req, res){
	res.render('qrcode-form.jade');
});

app.get('/qrcode', function(req, res){
	res.render('qrcode-form');
});

app.get('/qrcode/result', function(req, res){
	if( req.param('link') ){
		var qr = qrCode.qrcode(2, 'M');
		qr.addData(req.param('link'));
		qr.make();
		res.send(qr.createImgTag(5.6,5));
	}else{
		res.send('');
	}

});

app.listen(3000);
console.log('server start... port: 3000');

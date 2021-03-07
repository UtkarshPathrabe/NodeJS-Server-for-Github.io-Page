const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/hackerrank_badges', function (req, res) {
	fetch('https://www.hackerrank.com/rest/hackers/UtkarshPathrabe/badges')
		.then((response) => response.json())
		.then((json) => res.send(json))
		.catch((err) => {
			console.log('Error in hackerrank_badges. Details: ', err);
			res.send('Error');
		});
});

app.get('/', function (req, res) {
	res.send(
		'Hello World! Heroku Node JS application for my Github.io Page https://utkarshpathrabe.github.io/',
	);
});

app.get('*', function (req, res) {
	res.send('Invalid URL');
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
	console.log('App listening at port ' + port);
});

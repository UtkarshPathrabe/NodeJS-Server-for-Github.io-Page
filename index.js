const express = require('express');
const app = express();

app.get('/', function (req, res) {
	res.send('Hello World! Heroku Node JS Demo');
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
	console.log('App listening at port ' + port);
});

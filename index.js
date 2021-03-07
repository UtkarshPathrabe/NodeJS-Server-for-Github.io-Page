const express = require('express');
const fetch = require('node-fetch');
var cors = require('cors');
const app = express();

var corsOptions = {
	origin: 'https://utkarshpathrabe.github.io/',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());

app.get('/hackerrank_badges', function (req, res) {
	fetch('https://www.hackerrank.com/rest/hackers/UtkarshPathrabe/badges', {
		method: 'GET',
		headers: { 'Content-type': 'application/json;charset=UTF-8' },
	})
		.then((response) => response.json())
		.then((json) => res.send(json))
		.catch((err) => {
			console.log('Error in hackerrank_badges. Details: ', err);
			res.send('Error');
		});
});

const getDateDiffInDays = (date2, date1) =>
	Math.ceil(
		Math.abs(new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24),
	);

app.get('/hackerrank_submission_histories', function (req, res) {
	fetch(
		'https://www.hackerrank.com/rest/hackers/UtkarshPathrabe/submission_histories',
		{
			method: 'GET',
			headers: { 'Content-type': 'application/json;charset=UTF-8' },
		},
	)
		.then((response) => response.json())
		.then((json) => {
			const availableTimeStamps = Object.keys(json).sort();
			const submissionsData = [];
			for (let i = 0; i < availableTimeStamps.length; i++) {
				if (
					i > 0 &&
					getDateDiffInDays(
						availableTimeStamps[i],
						availableTimeStamps[i - 1],
					) > 1
				) {
					const currentDate = new Date(availableTimeStamps[i]);
					currentDate.setDate(currentDate.getDate() - 1);
					submissionsData.push([currentDate.getTime(), 0]);
				}
				submissionsData.push([
					new Date(availableTimeStamps[i]).getTime(),
					parseInt(json[availableTimeStamps[i]]),
				]);
				if (
					i < availableTimeStamps.length - 1 &&
					getDateDiffInDays(
						availableTimeStamps[i + 1],
						availableTimeStamps[i],
					) > 1
				) {
					const currentDate = new Date(availableTimeStamps[i]);
					currentDate.setDate(currentDate.getDate() + 1);
					submissionsData.push([currentDate.getTime(), 0]);
				}
			}
			res.send(submissionsData);
		})
		.catch((err) => {
			console.log('Error in hackerrank_badges. Details: ', err);
			res.send('Error');
		});
});

const leetcodePostBody = {
	operationName: 'getUserProfile',
	variables: {
		username: 'Utkarsh_Pathrabe',
	},
	query:
		'query getUserProfile($username: String!) {\nallQuestionsCount {\ndifficulty\ncount\n}\nmatchedUser(username: $username) {\nusername\nprofile {\nstarRating\nranking\n}\nsubmissionCalendar\nsubmitStats {\nacSubmissionNum {\ndifficulty\ncount\nsubmissions\n}\ntotalSubmissionNum {\ndifficulty\ncount\nsubmissions\n}\n}\n}\n}\n',
};

app.get('/leetcode_data', function (req, res) {
	fetch('https://leetcode.com/graphql', {
		method: 'POST',
		body: JSON.stringify(leetcodePostBody),
		headers: { 'Content-type': 'application/json;charset=UTF-8' },
	})
		.then((response) => response.json())
		.then((json) => res.send(json))
		.catch((err) => {
			console.log('Error in leetcode_data. Details: ', err);
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

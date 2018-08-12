const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.use((req, res, next) => {
	var log = `${ new Date().toString() }: ${ req.method } ${ req.url }`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) console.log('Unable to log on server.log');
	});
	next();
});

app.use((req, res, next) =>{
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to Express app!!!'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.listen(3000, () => console.log('server is up and running on 3000', __dirname));
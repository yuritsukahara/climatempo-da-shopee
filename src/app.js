const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define Path for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to save
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Climatempo da Shopee',
		name: 'Yuri Tsukahara',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'Sobre',
		name: 'Yuri Tsukahara',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Ajuda',
		name: 'Yuri Tsukahara',
		helpMessage: 'Não tem Galantia!',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Coloque um local válido',
		});
	}

	geocode(
		req.query.address,
		(error, { location, latitude, longitude } = {}) => {
			if (error) {
				return res.send({
					error,
				});
			}

			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({
						error,
					});
				}
				res.send({
					location,
					forecast: forecastData,
					address: req.query.address,
				});
			});
		}
	);
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Yuri Tsukahara',
		errorMessage: 'Article not found',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Yuri Tsukahara',
		errorMessage: 'Page not Found',
	});
});

// Start server

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
	console.log(`http://localhost:${port}`);
});


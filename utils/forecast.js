require('dotenv').config();

const request = require('postman-request');

const weatherKey = process.env.WEATHERAPIKEY;

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${latitude},${longitude}&units=m`;
	request({ url, json: true }, (error, {body} = {}) => {
		if (error) {
			callback('Sem conexão com o servidor', undefined);
		} else if (body.error) {
			callback('Unable to find location ', undefined);
		} else {
			const currentData = body.current;

			const windSpeed = currentData.wind_speed;
			const temperature = currentData.temperature;
			const precip = currentData.precip;
            const weatherDescription = currentData.weather_descriptions;

			callback(undefined, 
				temperature + 'ºC.' + ' Vento a ' + windSpeed + 'km/h. Com precipitação de ' + precip + 'mm. Como diria o Inglês: ' + weatherDescription)               
        }

		})}


module.exports = forecast;

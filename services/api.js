const config = require('../config/config.js');

const { version } = require('../package.json');

const { FECHA } = require('../generated.json');

const axios = require('axios');

async function country(country) {
	let respuesta = []

	for (let month = 3; month < 10; month ++) {
		for (let day = 1; day < 31; day ++) {
			if ((month == 4 || month == 6) && day > 30) {
				continue
			}

			let fecha = '2020-' + lpad(month) +'-' + lpad(day) +''
			let url = 'https://api.covid19tracking.narrativa.com/api/' + fecha + '/country/' + country
			await axios({
				method: 'get',
				url: url
				}).then((response) => {
					// Success 🎉
					respuesta.push(process(response.data))
				})
				.catch((error) => {
					// Error 😨
					respuesta = { err: error}
				});
		}
	}

	return respuesta
}

module.exports.country = country;

function lpad (str) {
	let tmp = '' + str
	if (str < 10) {
		tmp = '0' + str
	}
	return tmp
}

function process (response) {
	//console.log(response.dates)
	let dates = Object.values(response.dates)
	//console.log(countries[0]);
	let country = Object.values(dates[0])
	//console.log(country[0]);

	country = Object.values(country[0])
	//console.log(country[0]);

	let fecha = country[0].date
	console.error(fecha)

	let confirmedGBA = 0
	let deathsGBA = 0
	let confirmedInt = 0
	let deathsInt = 0

	for (let r in country[0].regions) {
		let region = country[0].regions[r]
		if (region.id == 'buenos_aires' || region.id == 'ciudad_autonoma_de_buenos_aires') {
			confirmedGBA += region.today_new_confirmed
			deathsGBA += region.today_new_deaths
		}
		else {
			confirmedInt += region.today_new_confirmed
			deathsInt += region.today_new_deaths
		}
	}
	return {
		fecha: fecha,
		confirmedGBA: confirmedGBA,
		deathsGBA: deathsGBA,
		confirmedInt: confirmedInt,
		deathsInt: deathsInt
	}
}
//today_new_confirmed	283
//today_new_deaths
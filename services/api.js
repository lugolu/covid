const config = require('../config/config.js');

const { version } = require('../package.json');

const { FECHA } = require('../generated.json');

const axios = require('axios');

async function country(country, fechaDesde, fechaHasta) {
	let respuesta = []

	let url = 'https://api.covid19tracking.narrativa.com/api/country/' + country + '?date_from=' + fechaDesde + '&date_to=' + fechaHasta
	await axios({
		method: 'get',
		url: url
		}).then((response) => {
			// Success 🎉
			respuesta = (process(response.data))
		})
		.catch((error) => {
			// Error 😨
			console.error(error)
			respuesta = { err: error}
		});

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

function process (res) {
	let response = []
	//console.log(response.dates)

	let dates = Object.values(res.dates)
	for (let d in dates) {
		let date = dates[d]
		//console.error(dates[d])

		let fecha = null
		let confirmedGBA = 0
		let deathsGBA = 0
		let confirmedInt = 0
		let deathsInt = 0
	
		let country = Object.values(date)
		country = Object.values(country[0])
	
		fecha = country[0].date
	
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

		console.error(fecha+';'+confirmedGBA+';'+deathsGBA+';'+confirmedInt+';'+deathsInt)
	
		response.push(
			 {
				fecha: fecha,
				confirmedGBA: confirmedGBA,
				deathsGBA: deathsGBA,
				confirmedInt: confirmedInt,
				deathsInt: deathsInt
			}
		);
	}

	return response
}
//today_new_confirmed	283
//today_new_deaths
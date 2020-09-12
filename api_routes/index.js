const api = require('./api.js');
const version = require('./version.js');

function init(app) {
	app.use('/api', api);
	app.use('/api', version);
}

module.exports.init = init;

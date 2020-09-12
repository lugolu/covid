const version = require('./version.js');

function init(app) {
	app.use('/api', version);
}

module.exports.init = init;

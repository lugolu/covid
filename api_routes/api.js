const express = require('express');
const router = new express.Router();
const api = require('../services/api.js');

const constants = require('../common/constants.js');

router.route('/country/:country?').get(async function (req, res, next) {
	let v = await api.country(req.params.country);
	res.status(constants.HTTP_OK).json(v);
});

module.exports = router;

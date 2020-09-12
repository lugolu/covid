const express = require('express');
const router = new express.Router();
const api = require('../services/api.js');

const constants = require('../common/constants.js');

router.route('/country/:country/:fechaDesde/:fechaHasta').get(async function (req, res, next) {
	let v = await api.country(req.params.country, req.params.fechaDesde, req.params.fechaHasta);
	res.status(constants.HTTP_OK).json(v);
});

module.exports = router;

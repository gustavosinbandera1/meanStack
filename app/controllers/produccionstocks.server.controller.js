'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Produccionstock = mongoose.model('Produccionstock'),
	_ = require('lodash');

/**
 * Create a Produccionstock
 */
exports.create = function(req, res) {

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}

	if (mm < 10) {
		mm = '0' + mm
	}

	today = mm + '/' + dd + '/' + yyyy;

	var produccionstock = new Produccionstock(req.body);
	produccionstock.user = req.user;
	produccionstock.created = today; //Date.now();
	produccionstock.updated = '';

	produccionstock.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {

			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
			socketio.sockets.emit('produccionstock.created', produccionstock);
			res.jsonp(produccionstock);

		}
	});
};

/**
 * Show the current Produccionstock
 */
exports.read = function(req, res) {
	res.jsonp(req.produccionstock);
};

/**
 * Update a Produccionstock
 */
exports.update = function(req, res) {
	var produccionstock = req.produccionstock;

	produccionstock = _.extend(produccionstock, req.body);

	produccionstock.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(produccionstock);
		}
	});
};

/**
 * Delete an Produccionstock
 */
exports.delete = function(req, res) {
	var produccionstock = req.produccionstock;

	produccionstock.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(produccionstock);
		}
	});
};

/**
 * List of Produccionstocks
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 5;
	var page = req.query.page || 1;


	var filter = {
		filters: {
			mandatory: {
				contains: req.query.filter
			}
		}
	};

	var pagination = {
		start: (page - 1) * count,
		count: count
	};

	if (req.query.sorting) {
		var sortKey = Object.keys(req.query.sorting)[0];
		var sortValue = req.query.sorting[sortKey];
		sortObject[sortValue] = sortKey;
	} else {
		sortObject.desc = '_id';
	}

	sort = {
		sort: sortObject
	};


	Produccionstock
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, produccionstocks) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(produccionstocks);

				console.log("la consulta de la tabla");
				console.log(produccionstocks.results);
			}
		});

};

/**
 * Produccionstock middleware
 */
exports.produccionstockByID = function(req, res, next, id) {
	Produccionstock.findById(id).populate('user', 'displayName').exec(function(err, produccionstock) {
		if (err) return next(err);
		if (!produccionstock) return next(new Error('Failed to load Produccionstock ' + id));
		req.produccionstock = produccionstock;
		next();
	});
};

/**
 * Produccionstock authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.produccionstock.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
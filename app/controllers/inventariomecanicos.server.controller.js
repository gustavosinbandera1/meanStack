'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Inventariomecanico = mongoose.model('Inventariomecanico'),
	_ = require('lodash');
	


exports.create = function(req, res) {
	var inventariomecanico = new Inventariomecanico(req.body);
	inventariomecanico.user = req.user;
	inventariomecanico.created = Date.now();
	inventariomecanico.updated = '';

	inventariomecanico.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('inventariomecanico.created', inventariomecanico);
			console.log("enviamos evento socket");
			res.jsonp(inventariomecanico);
		}
	});
};

/**
 * Show the current Inventariomecanico
 */
exports.read = function(req, res) {
	res.jsonp(req.inventariomecanico);
};

/**
 * Update a Inventariomecanico
 */
exports.update = function(req, res) {
	var inventariomecanico = req.inventariomecanico ;
	inventariomecanico.updated = Date.now();

	inventariomecanico = _.extend(inventariomecanico , req.body);

	inventariomecanico.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('inventariomecanico.updated', inventariomecanico);
			console.log("enviamos evento socket");
				res.jsonp(inventariomecanico);
			
		}
	});
};

/**
 * Delete an Inventariomecanico
 */
exports.delete = function(req, res) {
	var inventariomecanico = req.inventariomecanico ;

	inventariomecanico.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('inventariomecanico.deleted', inventariomecanico);
			console.log("enviamos evento socket");
				res.jsonp(inventariomecanico);
			
		}
	});
};

/**
 * List of Inventariomecanicos
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 5;
	var page = req.query.page || 1;


	var filter = {
		filters : {
			mandatory : {
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
	}
	else {
		sortObject.desc = '_id';
	}

	sort = {
		sort: sortObject
	};


	Inventariomecanico
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, inventariomecanicos){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(inventariomecanicos);
			}
		});

};

/**
 * Inventariomecanico middleware
 */
exports.inventariomecanicoByID = function(req, res, next, id) {
	Inventariomecanico.findById(id).populate('user', 'displayName').exec(function(err, inventariomecanico) {
		if (err) return next(err);
		if (! inventariomecanico) return next(new Error('Failed to load Inventariomecanico ' + id));
		req.inventariomecanico = inventariomecanico ;
		next();
	});
};

/**
 * Inventariomecanico authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.inventariomecanico.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

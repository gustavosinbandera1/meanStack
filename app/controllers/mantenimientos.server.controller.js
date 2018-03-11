'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Mantenimiento = mongoose.model('Mantenimiento'),
	_ = require('lodash');

/**
 * Create a Mantenimiento
 */
exports.create = function(req, res) {
	var mantenimiento = new Mantenimiento(req.body);
	mantenimiento.user = req.user;

	mantenimiento.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            
            socketio.sockets.emit('mantenimiento.created', mantenimiento);
			console.log("enviamos evento socket");
			res.jsonp(mantenimiento);
		}
	});
};

/**
 * Show the current Mantenimiento
 */
exports.read = function(req, res) {
	res.jsonp(req.mantenimiento);
};

/**
 * Update a Mantenimiento
 */
exports.update = function(req, res) {
	var mantenimiento = req.mantenimiento ;

	mantenimiento = _.extend(mantenimiento , req.body);

	mantenimiento.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            
            socketio.sockets.emit('mantenimiento.updated', mantenimiento);
			console.log("enviamos evento socket");
			res.jsonp(mantenimiento);
		}
	});
};

/**
 * Delete an Mantenimiento
 */
exports.delete = function(req, res) {
	var mantenimiento = req.mantenimiento ;

	mantenimiento.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            
            socketio.sockets.emit('mantenimiento.deleted', mantenimiento);
			console.log("enviamos evento socket");
			res.jsonp(mantenimiento);
			
		}
	});
};

/**
 * List of Mantenimientos
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


	Mantenimiento
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, mantenimientos){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(mantenimientos);
			}
		});

};

/**
 * Mantenimiento middleware
 */
exports.mantenimientoByID = function(req, res, next, id) {
	Mantenimiento.findById(id).populate('user', 'displayName').exec(function(err, mantenimiento) {
		if (err) return next(err);
		if (! mantenimiento) return next(new Error('Failed to load Mantenimiento ' + id));
		req.mantenimiento = mantenimiento ;
		next();
	});
};

/**
 * Mantenimiento authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.mantenimiento.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

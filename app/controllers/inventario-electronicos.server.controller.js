'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	InventarioElectronico = mongoose.model('InventarioElectronico'),
	_ = require('lodash');

/**
 * Create a Inventario electronico
 */
exports.create = function(req, res) {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10){ dd = '0'+dd } 
	if(mm<10){ mm = '0'+mm } 
	today = mm + '/' + dd + '/' + yyyy;


	var inventarioElectronico = new InventarioElectronico(req.body);
	inventarioElectronico.user = req.user;
	inventarioElectronico.created = today;
	inventarioElectronico.updated = '';

	inventarioElectronico.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('inventarioElectronico.created', inventarioElectronico);
			console.log("enviamos evento socket");
			res.jsonp(inventarioElectronico);
		}
	});
};

/**
 * Show the current Inventario electronico
 */
exports.read = function(req, res) {
	res.jsonp(req.inventarioElectronico);
};

/**
 * Update a Inventario electronico
 */
exports.update = function(req, res) {
	var inventarioElectronico = req.inventarioElectronico ;
	inventarioElectronico.update = Date.now();

	inventarioElectronico = _.extend(inventarioElectronico , req.body);

	inventarioElectronico.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('inventarioElectronico.updated', inventarioElectronico);
			console.log("enviamos evento socket");
			res.jsonp(inventarioElectronico);
			
		}
	});
};

/**
 * Delete an Inventario electronico
 */
exports.delete = function(req, res) {
	var inventarioElectronico = req.inventarioElectronico ;

	inventarioElectronico.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('inventarioElectronico.deleted', inventarioElectronico);
			console.log("enviamos evento socket");
			res.jsonp(inventarioElectronico);
		}
	});
};

/**
 * List of Inventario electronicos
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


	InventarioElectronico
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, inventarioElectronicos){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(inventarioElectronicos);
			}
		});

};

/**
 * Inventario electronico middleware
 */
exports.inventarioElectronicoByID = function(req, res, next, id) {
	InventarioElectronico.findById(id).populate('user', 'displayName').exec(function(err, inventarioElectronico) {
		if (err) return next(err);
		if (! inventarioElectronico) return next(new Error('Failed to load Inventario electronico ' + id));
		req.inventarioElectronico = inventarioElectronico ;
		next();
	});
};

/**
 * Inventario electronico authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.inventarioElectronico.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

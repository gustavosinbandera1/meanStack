'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Materiaprima = mongoose.model('Materiaprima'),
	_ = require('lodash');

/**
 * Create a Materiaprima
 */
exports.create = function(req, res) {
	var date = new Date();
	date.setHours(0,0,0,0,0);//ajustamos la hora
	date.setDate(date.getDate());//ajustamos la fecha

	console.log("fecha de creacion: ");
	console.log(date);
	var materiaprima = new Materiaprima(req.body);
	materiaprima.user = req.user;
	materiaprima.created = date;
	console.log(materiaprima.created);
	materiaprima.updated = '';
	materiaprima.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('materiaprima.created', materiaprima);
			console.log("materia prima creada");
		    res.jsonp(materiaprima);
		}
	});
};

/**
 * Show the current Materiaprima
 */
exports.read = function(req, res) {
	res.jsonp(req.materiaprima);
};

/**
 * Update a Materiaprima
 */
exports.update = function(req, res) {
	var date = new Date();
	date.setDate(date.getDate()-1);//ajustamos la fecha
	date.setHours(date.getHours()+19);//ajustamos la hora
	
	var materiaprima = req.materiaprima ;

	materiaprima = _.extend(materiaprima , req.body);
	materiaprima.updated = date;
	materiaprima.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('materiaprima.updated', materiaprima);
			console.log("materia prima actualizada");
				res.jsonp(materiaprima);
			
		}
	});
};

/**
 * Delete an Materiaprima
 */
exports.delete = function(req, res) {
	var materiaprima = req.materiaprima ;

	materiaprima.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('materiaprima.deleted', materiaprima);
			console.log("materia prima eliminada");
			res.jsonp(materiaprima);
			//res.jsonp(materiaprima);
		}
	});
};

/**
 * List of Materiaprimas
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


	Materiaprima
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, materiaprimas){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(materiaprimas);
			}
		});

};

/**
 * Materiaprima middleware
 */
exports.materiaprimaByID = function(req, res, next, id) {
	Materiaprima.findById(id).populate('user', 'displayName').exec(function(err, materiaprima) {
		if (err) return next(err);
		if (! materiaprima) return next(new Error('Failed to load Materiaprima ' + id));
		req.materiaprima = materiaprima ;
		next();
	});
};

/**
 * Materiaprima authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.materiaprima.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

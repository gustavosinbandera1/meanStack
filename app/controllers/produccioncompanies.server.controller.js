'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Produccioncompany = mongoose.model('Produccioncompany'),
	_ = require('lodash');

/**
 * Create a Produccioncompany
 */
exports.create = function(req, res) {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	today = mm + '/' + dd + '/' + yyyy;

	var produccioncompany = new Produccioncompany(req.body);
	produccioncompany.user = req.user;
	produccioncompany.created = today;
	produccioncompany.updated = '';

	produccioncompany.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			

			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            socketio.sockets.emit('produccioncompany.created', produccioncompany);
			console.log("enviamos evento socket");
			res.jsonp(produccioncompany);
		}
	});
};

/**
 * Show the current Produccioncompany
 */
exports.read = function(req, res) {
	res.jsonp(req.produccioncompany);
};

/**
 * Update a Produccioncompany
 */
exports.update = function(req, res) {
	var produccioncompany = req.produccioncompany ;

	produccioncompany = _.extend(produccioncompany , req.body);

	produccioncompany.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(produccioncompany);
		}
	});
};

/**
 * Delete an Produccioncompany
 */
exports.delete = function(req, res) {
	var produccioncompany = req.produccioncompany ;

	produccioncompany.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(produccioncompany);
		}
	});
};

/**
 * List of Produccioncompanies
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


	Produccioncompany
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, produccioncompanies){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(produccioncompanies);
			}
		});

};

/**
 * Produccioncompany middleware
 */
exports.produccioncompanyByID = function(req, res, next, id) {
	Produccioncompany.findById(id).populate('user', 'displayName').exec(function(err, produccioncompany) {
		if (err) return next(err);
		if (! produccioncompany) return next(new Error('Failed to load Produccioncompany ' + id));
		req.produccioncompany = produccioncompany ;
		next();
	});
};

/**
 * Produccioncompany authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.produccioncompany.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Basculaconfiguration = mongoose.model('Basculaconfiguration'),
	_ = require('lodash');

/**
 * Create a Basculaconfiguration
 */
exports.create = function(req, res) {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10){ dd = '0'+dd } 
	if(mm<10){ mm = '0'+mm } 
	today = mm + '/' + dd + '/' + yyyy;



	var basculaconfiguration = new Basculaconfiguration(req.body);
	basculaconfiguration.user = req.user;
	basculaconfiguration.created =today;
	basculaconfiguration.updated = '';

	basculaconfiguration.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            
            socketio.sockets.emit('basculaconfiguration.created', basculaconfiguration);
			console.log("enviamos evento socket");
			res.jsonp(basculaconfiguration);

			
		}
	});
};

/**
 * Show the current Basculaconfiguration
 */
exports.read = function(req, res) {
	res.jsonp(req.basculaconfiguration);
};

/**
 * Update a Basculaconfiguration
 */
exports.update = function(req, res) {
	var basculaconfiguration = req.basculaconfiguration ;
		basculaconfiguration.updated = Date.now();
	basculaconfiguration = _.extend(basculaconfiguration , req.body);

	basculaconfiguration.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            
            socketio.sockets.emit('basculaconfiguration.updated', basculaconfiguration);
			console.log("enviamos evento socket");
			res.jsonp(basculaconfiguration);
		}
	});
};

/**
 * Delete an Basculaconfiguration
 */
exports.delete = function(req, res) {
	var basculaconfiguration = req.basculaconfiguration ;

	basculaconfiguration.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            
            socketio.sockets.emit('basculaconfiguration.deleted', basculaconfiguration);
			console.log("enviamos evento socket");
			res.jsonp(basculaconfiguration);
		
		}
	});
};

/**
 * List of Basculaconfigurations
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 100;
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


	Basculaconfiguration
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, basculaconfigurations){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(basculaconfigurations);
			}
		});

};

/**
 * Basculaconfiguration middleware
 */
exports.basculaconfigurationByID = function(req, res, next, id) {
	Basculaconfiguration.findById(id).populate('user', 'displayName').exec(function(err, basculaconfiguration) {
		if (err) return next(err);
		if (! basculaconfiguration) return next(new Error('Failed to load Basculaconfiguration ' + id));
		req.basculaconfiguration = basculaconfiguration ;
		next();
	});
};

/**
 * Basculaconfiguration authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.basculaconfiguration.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

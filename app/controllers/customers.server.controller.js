'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Customer = mongoose.model('Customer'),
	_ = require('lodash');

/**
 * Create a Customer
 */
exports.create = function(req, res) {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10){ dd = '0'+dd } 
	if(mm<10){ mm = '0'+mm } 
	today = mm + '/' + dd + '/' + yyyy;


	var customer = new Customer(req.body);
	customer.user = req.user;
	customer.created = today;

	customer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            
            socketio.sockets.emit('customer.created', customer);
			console.log("enviamos evento socket");
			res.jsonp(customer);
		}
	});
};

/**
 * Show the current Customer
 */
exports.read = function(req, res) {
	res.jsonp(req.customer);
};

/**
 * Update a Customer
 */
exports.update = function(req, res) {
	var customer = req.customer ;
	customer.updated = Date.now();

	customer = _.extend(customer , req.body);
	

	customer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            
            socketio.sockets.emit('customer.update', customer);
			console.log("enviamos evento socket");
			res.jsonp(customer);
		}
	});
};

/**
 * Delete an Customer
 */
exports.delete = function(req, res) {
	var customer = req.customer ;

	customer.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            
            socketio.sockets.emit('customer.delete', customer);
			//res.jsonp(customer);
			console.log("enviamos evento socket");
			res.jsonp(customer);
		}
	});
};

/**
 * List of Customers
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


	Customer
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, customers){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(customers);
			}
		});

};

/**
 * Customer middleware
 */
exports.customerByID = function(req, res, next, id) {
	Customer.findById(id).populate('user', 'displayName').exec(function(err, customer) {
		if (err) return next(err);
		if (! customer) return next(new Error('Failed to load Customer ' + id));
		req.customer = customer ;
		next();
	});
};

/**
 * Customer authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.customer.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

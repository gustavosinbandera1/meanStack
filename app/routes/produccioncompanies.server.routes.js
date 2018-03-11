'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var produccioncompanies = require('../../app/controllers/produccioncompanies.server.controller');

	// Produccioncompanies Routes
	app.route('/produccioncompanies')
		.get(produccioncompanies.list)
		.post(users.requiresLogin, produccioncompanies.create);

	app.route('/produccioncompanies/:produccioncompanyId')
		.get(produccioncompanies.read)
		.put(users.requiresLogin, produccioncompanies.hasAuthorization, produccioncompanies.update)
		.delete(users.requiresLogin, produccioncompanies.hasAuthorization, produccioncompanies.delete);

	// Finish by binding the Produccioncompany middleware
	app.param('produccioncompanyId', produccioncompanies.produccioncompanyByID);
};

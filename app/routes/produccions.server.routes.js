'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var produccions = require('../../app/controllers/produccions.server.controller');

	// Produccions Routes
	app.route('/produccions')
		.get(produccions.list)
		.post(users.requiresLogin, produccions.create);

	app.route('/produccions/:produccionId')
		.get(produccions.read)
		.put(users.requiresLogin, produccions.hasAuthorization, produccions.update)
		.delete(users.requiresLogin, produccions.hasAuthorization, produccions.delete);

	// Finish by binding the Produccion middleware
	app.param('produccionId', produccions.produccionByID);
};

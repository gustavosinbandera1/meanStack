'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var mantenimientos = require('../../app/controllers/mantenimientos.server.controller');

	// Mantenimientos Routes
	app.route('/mantenimientos')
		.get(mantenimientos.list)
		.post(users.requiresLogin, mantenimientos.create);

	app.route('/mantenimientos/:mantenimientoId')
		.get(mantenimientos.read)
		.put(users.requiresLogin, mantenimientos.hasAuthorization, mantenimientos.update)
		.delete(users.requiresLogin, mantenimientos.hasAuthorization, mantenimientos.delete);

	// Finish by binding the Mantenimiento middleware
	app.param('mantenimientoId', mantenimientos.mantenimientoByID);
};

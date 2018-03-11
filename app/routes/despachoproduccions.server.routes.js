'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var despachoproduccions = require('../../app/controllers/despachoproduccions.server.controller');

	// Despachoproduccions Routes
	app.route('/despachoproduccions')
		.get(despachoproduccions.list)
		.post(users.requiresLogin, despachoproduccions.create);

	app.route('/despachoproduccions/:despachoproduccionId')
		.get(despachoproduccions.read)
		.put(users.requiresLogin, despachoproduccions.hasAuthorization, despachoproduccions.update)
		.delete(users.requiresLogin, despachoproduccions.hasAuthorization, despachoproduccions.delete);

		
	// Finish by binding the Despachoproduccion middleware
	app.param('despachoproduccionId', despachoproduccions.despachoproduccionByID);
};

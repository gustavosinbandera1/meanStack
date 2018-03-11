'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var produccionstocks = require('../../app/controllers/produccionstocks.server.controller');

	// Produccionstocks Routes
	app.route('/produccionstocks')
		.get(produccionstocks.list)
		.post(users.requiresLogin, produccionstocks.create);

	app.route('/produccionstocks/:produccionstockId')
		.get(produccionstocks.read)
		.put(users.requiresLogin, produccionstocks.hasAuthorization, produccionstocks.update)
		.delete(users.requiresLogin, produccionstocks.hasAuthorization, produccionstocks.delete);

	// Finish by binding the Produccionstock middleware
	app.param('produccionstockId', produccionstocks.produccionstockByID);
};

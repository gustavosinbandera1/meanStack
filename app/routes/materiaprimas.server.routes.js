'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var materiaprimas = require('../../app/controllers/materiaprimas.server.controller');

	// Materiaprimas Routes
	app.route('/materiaprimas')
		.get(materiaprimas.list)
		.post(users.requiresLogin, materiaprimas.create);

	app.route('/materiaprimas/:materiaprimaId')
		.get(materiaprimas.read)
		.put(users.requiresLogin, materiaprimas.hasAuthorization, materiaprimas.update)
		.delete(users.requiresLogin, materiaprimas.hasAuthorization, materiaprimas.delete);

	// Finish by binding the Materiaprima middleware
	app.param('materiaprimaId', materiaprimas.materiaprimaByID);
};

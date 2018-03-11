'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var basculaconfigurations = require('../../app/controllers/basculaconfigurations.server.controller');

	// Basculaconfigurations Routes
	app.route('/basculaconfigurations')
		.get(basculaconfigurations.list)
		.post(users.requiresLogin, basculaconfigurations.create);

	app.route('/basculaconfigurations/:basculaconfigurationId')
		.get(basculaconfigurations.read)
		.put(users.requiresLogin, basculaconfigurations.hasAuthorization, basculaconfigurations.update)
		.delete(users.requiresLogin, basculaconfigurations.hasAuthorization, basculaconfigurations.delete);

	// Finish by binding the Basculaconfiguration middleware
	app.param('basculaconfigurationId', basculaconfigurations.basculaconfigurationByID);
};

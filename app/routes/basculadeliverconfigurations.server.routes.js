'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var basculadeliverconfigurations = require('../../app/controllers/basculadeliverconfigurations.server.controller');

	// Basculadeliverconfigurations Routes
	app.route('/basculadeliverconfigurations')
		.get(basculadeliverconfigurations.list)
		.post(users.requiresLogin, basculadeliverconfigurations.create);

	app.route('/basculadeliverconfigurations/:basculadeliverconfigurationId')
		.get(basculadeliverconfigurations.read)
		.put(users.requiresLogin, basculadeliverconfigurations.hasAuthorization, basculadeliverconfigurations.update)
		.delete(users.requiresLogin, basculadeliverconfigurations.hasAuthorization, basculadeliverconfigurations.delete);

	// Finish by binding the Basculadeliverconfiguration middleware
	app.param('basculadeliverconfigurationId', basculadeliverconfigurations.basculadeliverconfigurationByID);
};

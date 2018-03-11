'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var inventariomecanicos = require('../../app/controllers/inventariomecanicos.server.controller');
	

	// Inventariomecanicos Routes
	app.route('/inventariomecanicos')
		.get(inventariomecanicos.list)
		.post(users.requiresLogin, inventariomecanicos.create);

	app.route('/inventariomecanicos/:inventariomecanicoId')
		.get(inventariomecanicos.read)
		.put(users.requiresLogin, inventariomecanicos.hasAuthorization, inventariomecanicos.update)
		.delete(users.requiresLogin, inventariomecanicos.hasAuthorization, inventariomecanicos.delete);

	
	// Finish by binding the Inventariomecanico middleware
	app.param('inventariomecanicoId', inventariomecanicos.inventariomecanicoByID);
};

'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var inventarioElectronicos = require('../../app/controllers/inventario-electronicos.server.controller');

	// Inventario electronicos Routes
	app.route('/inventario-electronicos')
		.get(inventarioElectronicos.list)
		.post(users.requiresLogin, inventarioElectronicos.create);

	app.route('/inventario-electronicos/:inventarioElectronicoId')
		.get(inventarioElectronicos.read)
		.put(users.requiresLogin, inventarioElectronicos.hasAuthorization, inventarioElectronicos.update)
		.delete(users.requiresLogin, inventarioElectronicos.hasAuthorization, inventarioElectronicos.delete);

	// Finish by binding the Inventario electronico middleware
	app.param('inventarioElectronicoId', inventarioElectronicos.inventarioElectronicoByID);
};

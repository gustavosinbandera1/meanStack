'use strict';

// Configuring the new module
angular.module('basculadeliverconfigurations').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Configurar Bascula Despachos', 'basculadeliverconfigurations', 'dropdown', '/basculadeliverconfigurations(/create)?');
		Menus.addSubMenuItem('topbar', 'basculadeliverconfigurations', 'Ver Configuraciones', 'basculadeliverconfigurations');
		Menus.addSubMenuItem('topbar', 'basculadeliverconfigurations', 'Crear Nueva Configuracion', 'basculadeliverconfigurations/create');
	}
]);

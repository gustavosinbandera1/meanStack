'use strict';

// Configuring the new module
angular.module('basculaconfigurations').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Configurar Bascula Ingresos', 'basculaconfigurations', 'dropdown', '/basculaconfigurations(/create)?');
		Menus.addSubMenuItem('topbar', 'basculaconfigurations', 'Ver Configuraciones', 'basculaconfigurations');
		Menus.addSubMenuItem('topbar', 'basculaconfigurations', 'Crear Nueva configuracion', 'basculaconfigurations/create');
	}
]);

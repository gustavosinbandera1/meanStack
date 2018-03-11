'use strict';

// Configuring the new module
angular.module('produccions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ingresos De Produccion', 'produccions', 'dropdown', '/produccions(/create)?');
		Menus.addSubMenuItem('topbar', 'produccions', 'Listar Produccion', 'produccions');
		Menus.addSubMenuItem('topbar', 'produccions', 'Ingresar Produccion', 'produccions/create');
	}
]);

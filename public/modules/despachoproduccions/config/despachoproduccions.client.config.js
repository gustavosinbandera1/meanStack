'use strict';

// Configuring the new module
angular.module('despachoproduccions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Despachos', 'despachoproduccions', 'dropdown', '/despachoproduccions(/create)?');
		Menus.addSubMenuItem('topbar', 'despachoproduccions', 'Mostrar Despachos', 'despachoproduccions');
		Menus.addSubMenuItem('topbar', 'despachoproduccions', 'Crear Despacho', 'despachoproduccions/create');
	}
]);
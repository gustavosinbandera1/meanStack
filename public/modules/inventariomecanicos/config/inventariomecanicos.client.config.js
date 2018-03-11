'use strict';

// Configuring the new module
angular.module('inventariomecanicos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Inventario Mecanico', 'inventariomecanicos', 'dropdown', '/inventariomecanicos(/create)?');
		
		/*
		Menus.addSubMenuItem('topbar', 'customers', 'Listar Inventario partes mecanicas', 'inventariomecanicos');
		Menus.addSubMenuItem('topbar', 'customers', 'Nuevo Inventario partes mecanicas', 'inventariomecanicos/create');
		*/
	}
]);

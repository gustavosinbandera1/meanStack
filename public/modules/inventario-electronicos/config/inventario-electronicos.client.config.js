'use strict';

// Configuring the new module
angular.module('inventario-electronicos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Inventario electronicos', 'customer', 'dropdown', '/inventario-electronicos(/create)?');
		
		/*
		Menus.addSubMenuItem('topbar', 'customers', 'Listar inventario partes electronicas', 'inventario-electronicos');
		Menus.addSubMenuItem('topbar', 'customers', 'Nuevo Ingreso partes electronicas', 'inventario-electronicos/create');
		*/
	}
]);


//addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
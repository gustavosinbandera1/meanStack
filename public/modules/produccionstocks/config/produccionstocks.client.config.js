'use strict';

// Configuring the new module
angular.module('produccionstocks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Resumen De Produccion', 'produccionstocks', 'dropdown', '/produccionstocks(/create)?');
		Menus.addSubMenuItem('topbar', 'produccionstocks', 'Mostrar Existencia', 'produccionstocks');
		//Menus.addSubMenuItem('topbar', 'produccionstocks', 'New Produccionstock', 'produccionstocks/create');
	}
]);

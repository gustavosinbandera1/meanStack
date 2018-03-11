'use strict';

// Configuring the new module
angular.module('customers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		
		Menus.addMenuItem('topbar', 
			'Clientes', 
			'customers', 
			'dropdown', 
			'/customers(/create)?',
			0,
			null,
			1
			);
			

		Menus.addSubMenuItem('topbar', 'customers', 'Mostrar Clientes', 'customers');
		Menus.addSubMenuItem('topbar', 'customers', 'Ingresar Cliente', 'customers/create');
	


	

    // Add the dropdown list item
   

	}
]);
/*
Menus.addMenuItem('topbar',
			'Materia prima', 
			'materiaprimas', 
			'dropdown', 
			'/materiaprimas(/create)?',
			0,//isPublic?
			null,
			2

			);*/
/*
addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
*/





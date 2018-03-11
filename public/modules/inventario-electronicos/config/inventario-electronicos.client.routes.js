'use strict';

//Setting up route
angular.module('inventario-electronicos').config(['$stateProvider',
	function($stateProvider) {
		// Inventario electronicos state routing
		$stateProvider.
		state('listInventarioElectronicos', {
			url: '/inventario-electronicos',
			templateUrl: 'modules/inventario-electronicos/views/list-inventario-electronicos.client.view.html'
		}).
		state('createInventarioElectronico', {
			url: '/inventario-electronicos/create',
			templateUrl: 'modules/inventario-electronicos/views/create-inventario-electronico.client.view.html'
		}).
		state('viewInventarioElectronico', {
			url: '/inventario-electronicos/:inventarioElectronicoId',
			templateUrl: 'modules/inventario-electronicos/views/view-inventario-electronico.client.view.html'
		}).
		state('editInventarioElectronico', {
			url: '/inventario-electronicos/:inventarioElectronicoId/edit',
			templateUrl: 'modules/inventario-electronicos/views/edit-inventario-electronico.client.view.html'
		});
	}
]);
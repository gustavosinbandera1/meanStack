'use strict';

//Setting up route
angular.module('inventariomecanicos').config(['$stateProvider',
	function($stateProvider) {
		// Inventariomecanicos state routing
		$stateProvider.
		state('listInventariomecanicos', {
			url: '/inventariomecanicos',
			templateUrl: 'modules/inventariomecanicos/views/list-inventariomecanicos.client.view.html'
		}).
		state('createInventariomecanico', {
			url: '/inventariomecanicos/create',
			templateUrl: 'modules/inventariomecanicos/views/create-inventariomecanico.client.view.html'
		}).
		state('viewInventariomecanico', {
			url: '/inventariomecanicos/:inventariomecanicoId',
			templateUrl: 'modules/inventariomecanicos/views/view-inventariomecanico.client.view.html'
		}).
		state('editInventariomecanico', {
			url: '/inventariomecanicos/:inventariomecanicoId/edit',
			templateUrl: 'modules/inventariomecanicos/views/edit-inventariomecanico.client.view.html'
		});
	}
]);
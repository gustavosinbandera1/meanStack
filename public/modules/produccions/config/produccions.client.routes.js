'use strict';

//Setting up route
angular.module('produccions').config(['$stateProvider',
	function($stateProvider) {
		// Produccions state routing
		$stateProvider.
		state('listProduccions', {
			url: '/produccions',
			templateUrl: 'modules/produccions/views/list-produccions.client.view.html'
		}).
		state('createProduccion', {
			url: '/produccions/create',
			templateUrl: 'modules/produccions/views/create-produccion.client.view.html',
			controller: 'ProduccionsController as vm'
		}).
		state('viewProduccion', {
			url: '/produccions/:produccionId',
			templateUrl: 'modules/produccions/views/view-produccion.client.view.html',
			controller: 'ProduccionsController as vm'
		}).
		state('editProduccion', {
			url: '/produccions/:produccionId/edit',
			templateUrl: 'modules/produccions/views/edit-produccion.client.view.html',
			controller: 'ProduccionsController as vm'
		});
	}
]);
'use strict';

//Setting up route
angular.module('despachoproduccions').config(['$stateProvider',
	function($stateProvider) {
		// Despachoproduccions state routing
		$stateProvider.
		state('listDespachoproduccions', {
			url: '/despachoproduccions',
			templateUrl: 'modules/despachoproduccions/views/list-despachoproduccions.client.view.html'
		}).
		state('createDespachoproduccion', {
			url: '/despachoproduccions/create',
			templateUrl: 'modules/despachoproduccions/views/create-despachoproduccion.client.view.html',
			controller: 'DespachoproduccionsController as vm'
		}).
		state('viewDespachoproduccion', {
			url: '/despachoproduccions/:despachoproduccionId',
			templateUrl: 'modules/despachoproduccions/views/view-despachoproduccion.client.view.html'
		}).
		state('editDespachoproduccion', {
			url: '/despachoproduccions/:despachoproduccionId/edit',
			templateUrl: 'modules/despachoproduccions/views/edit-despachoproduccion.client.view.html'
		});
	}
]);

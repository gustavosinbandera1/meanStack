'use strict';

//Setting up route
angular.module('produccionstocks').config(['$stateProvider',
	function($stateProvider) {
		// Produccionstocks state routing
		$stateProvider.
		state('listProduccionstocks', {
			url: '/produccionstocks',
			templateUrl: 'modules/produccionstocks/views/list-produccionstocks.client.view.html'
		}).
		state('createProduccionstock', {
			url: '/produccionstocks/create',
			templateUrl: 'modules/produccionstocks/views/create-produccionstock.client.view.html'
		}).
		state('viewProduccionstock', {
			url: '/produccionstocks/:produccionstockId',
			templateUrl: 'modules/produccionstocks/views/view-produccionstock.client.view.html'
		}).
		state('editProduccionstock', {
			url: '/produccionstocks/:produccionstockId/edit',
			templateUrl: 'modules/produccionstocks/views/edit-produccionstock.client.view.html'
		});
	}
]);
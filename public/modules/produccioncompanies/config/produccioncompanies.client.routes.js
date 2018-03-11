'use strict';

//Setting up route
angular.module('produccioncompanies').config(['$stateProvider',
	function($stateProvider) {
		// Produccioncompanies state routing
		$stateProvider.
		state('listProduccioncompanies', {
			url: '/produccioncompanies',
			templateUrl: 'modules/produccioncompanies/views/list-produccioncompanies.client.view.html'
		}).
		state('createProduccioncompany', {
			url: '/produccioncompanies/create',
			templateUrl: 'modules/produccioncompanies/views/create-produccioncompany.client.view.html'
		}).
		state('viewProduccioncompany', {
			url: '/produccioncompanies/:produccioncompanyId',
			templateUrl: 'modules/produccioncompanies/views/view-produccioncompany.client.view.html'
		}).
		state('editProduccioncompany', {
			url: '/produccioncompanies/:produccioncompanyId/edit',
			templateUrl: 'modules/produccioncompanies/views/edit-produccioncompany.client.view.html'
		});
	}
]);
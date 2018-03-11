'use strict';

//Setting up route
angular.module('mantenimientos').config(['$stateProvider',
	function($stateProvider) {
		// Mantenimientos state routing
		$stateProvider.
		state('listMantenimientos', {
			url: '/mantenimientos',
			templateUrl: 'modules/mantenimientos/views/list-mantenimientos.client.view.html'
		}).
		state('createMantenimiento', {
			url: '/mantenimientos/create',
			templateUrl: 'modules/mantenimientos/views/create-mantenimiento.client.view.html'
		}).
		state('viewMantenimiento', {
			url: '/mantenimientos/:mantenimientoId',
			templateUrl: 'modules/mantenimientos/views/view-mantenimiento.client.view.html'
		}).
		state('editMantenimiento', {
			url: '/mantenimientos/:mantenimientoId/edit',
			templateUrl: 'modules/mantenimientos/views/edit-mantenimiento.client.view.html'
		});
	}
]);
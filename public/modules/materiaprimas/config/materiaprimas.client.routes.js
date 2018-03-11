'use strict';

//Setting up route
angular.module('materiaprimas').config(['$stateProvider',
	function($stateProvider) {
		// Materiaprimas state routing
		$stateProvider.
		state('listMateriaprimas', {
			url: '/materiaprimas',
			templateUrl: 'modules/materiaprimas/views/list-materiaprimas.client.view.html'
		}).
		state('createMateriaprima', {
			url: '/materiaprimas/create',
			templateUrl: 'modules/materiaprimas/views/create-materiaprima.client.view.html'
		}).
		state('viewMateriaprima', {
			url: '/materiaprimas/:materiaprimaId',
			templateUrl: 'modules/materiaprimas/views/view-materiaprima.client.view.html'
		}).
		state('editMateriaprima', {
			url: '/materiaprimas/:materiaprimaId/edit',
			templateUrl: 'modules/materiaprimas/views/edit-materiaprima.client.view.html'
		});
	}
]);
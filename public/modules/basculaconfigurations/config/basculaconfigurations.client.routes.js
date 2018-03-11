'use strict';

//Setting up route
angular.module('basculaconfigurations').config(['$stateProvider',
	function($stateProvider) {
		// Basculaconfigurations state routing
		$stateProvider.
		state('listBasculaconfigurations', {
			url: '/basculaconfigurations',
			templateUrl: 'modules/basculaconfigurations/views/list-basculaconfigurations.client.view.html'
		}).
		state('createBasculaconfiguration', {
			url: '/basculaconfigurations/create',
			templateUrl: 'modules/basculaconfigurations/views/create-basculaconfiguration.client.view.html',
			controller: 'BasculaconfigurationsController as vm'
		}).
		state('viewBasculaconfiguration', {
			url: '/basculaconfigurations/:basculaconfigurationId',
			templateUrl: 'modules/basculaconfigurations/views/view-basculaconfiguration.client.view.html',
			controller: 'BasculaconfigurationsController as vm'
		}).
		state('editBasculaconfiguration', {
			url: '/basculaconfigurations/:basculaconfigurationId/edit',
			templateUrl: 'modules/basculaconfigurations/views/edit-basculaconfiguration.client.view.html',
			controller: 'BasculaconfigurationsController as vm'
		});
	}
]);
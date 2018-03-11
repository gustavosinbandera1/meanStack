

'use strict';

//Setting up route
angular.module('basculadeliverconfigurations').config(['$stateProvider',
	function($stateProvider) {
		// Basculaconfigurations state routing
		$stateProvider.
		state('listBasculadeliverconfigurations', {
			url: '/basculadeliverconfigurations',
			templateUrl: 'modules/basculadeliverconfigurations/views/list-basculadeliverconfigurations.client.view.html',
			controller: 'BasculadeliverconfigurationsController as vm'
		}).
		state('createBasculadeliverconfiguration', {
			url: '/basculadeliverconfigurations/create',
			templateUrl: 'modules/basculadeliverconfigurations/views/create-basculadeliverconfiguration.client.view.html',
			controller: 'BasculadeliverconfigurationsController as vm'
		}).
		state('viewBasculadeliverconfiguration', {
			url: '/basculadeliverconfigurations/:basculadeliverconfigurationId',
			templateUrl: 'modules/basculadeliverconfigurations/views/view-basculadeliverconfiguration.client.view.html',
			controller: 'BasculadeliverconfigurationsController as vm'
		}).
		state('editBasculadeliverconfiguration', {
			url: '/basculadeliverconfigurations/:basculadeliverconfigurationId/edit',
			templateUrl: 'modules/basculadeliverconfigurations/views/edit-basculadeliverconfiguration.client.view.html',
			controller: 'BasculadeliverconfigurationsController as vm'
		});
	}
]);
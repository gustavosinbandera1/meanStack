'use strict';

//Despachoproduccions service used to communicate Despachoproduccions REST endpoints
angular.module('despachoproduccions').factory('Despachoproduccions', ['$resource',
	function($resource) {
		return $resource('despachoproduccions/:despachoproduccionId', {
			despachoproduccionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
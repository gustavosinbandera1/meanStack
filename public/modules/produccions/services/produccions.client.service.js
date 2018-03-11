'use strict';

//Produccions service used to communicate Produccions REST endpoints
angular.module('produccions').factory('Produccions', ['$resource',
	function($resource) {
		return $resource('produccions/:produccionId', { produccionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
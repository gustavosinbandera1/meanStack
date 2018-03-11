'use strict';

//Produccioncompanies service used to communicate Produccioncompanies REST endpoints
angular.module('produccioncompanies').factory('Produccioncompanies', ['$resource',
	function($resource) {
		return $resource('produccioncompanies/:produccioncompanyId', { produccioncompanyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
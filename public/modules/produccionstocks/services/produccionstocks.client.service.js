'use strict';

//Produccionstocks service used to communicate Produccionstocks REST endpoints
angular.module('produccionstocks').factory('Produccionstocks', ['$resource',
	function($resource) {
		return $resource('produccionstocks/:produccionstockId', { produccionstockId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
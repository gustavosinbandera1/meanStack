'use strict';

//Mantenimientos service used to communicate Mantenimientos REST endpoints
angular.module('mantenimientos').factory('Mantenimientos', ['$resource',
	function($resource) {
		return $resource('mantenimientos/:mantenimientoId', { mantenimientoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
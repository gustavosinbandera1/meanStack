'use strict';

//Materiaprimas service used to communicate Materiaprimas REST endpoints
angular.module('materiaprimas').factory('Materiaprimas', ['$resource',
	function($resource) {
		return $resource('materiaprimas/:materiaprimaId', { materiaprimaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
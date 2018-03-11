'use strict';

//Inventariomecanicos service used to communicate Inventariomecanicos REST endpoints
angular.module('inventariomecanicos').factory('Inventariomecanicos', ['$resource',
	function($resource) {
		return $resource('inventariomecanicos/:inventariomecanicoId', { inventariomecanicoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
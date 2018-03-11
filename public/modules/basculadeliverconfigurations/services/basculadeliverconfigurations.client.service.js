'use strict';

//Basculadeliverconfigurations service used to communicate Basculadeliverconfigurations REST endpoints
angular.module('basculadeliverconfigurations').factory('Basculadeliverconfigurations', ['$resource',
	function($resource) {
		return $resource('basculadeliverconfigurations/:basculadeliverconfigurationId', { basculadeliverconfigurationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
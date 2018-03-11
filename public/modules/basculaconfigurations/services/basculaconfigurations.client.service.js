'use strict';

//Basculaconfigurations service used to communicate Basculaconfigurations REST endpoints
angular.module('basculaconfigurations').factory('Basculaconfigurations', ['$resource',
	function($resource) {
		return $resource('basculaconfigurations/:basculaconfigurationId', { basculaconfigurationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
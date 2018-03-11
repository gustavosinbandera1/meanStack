'use strict';

//Inventario electronicos service used to communicate Inventario electronicos REST endpoints
angular.module('inventario-electronicos').factory('InventarioElectronicos', ['$resource',
	function($resource) {
		return $resource('inventario-electronicos/:inventarioElectronicoId', { inventarioElectronicoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
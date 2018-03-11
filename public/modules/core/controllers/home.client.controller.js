'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','Socket',
	function($scope, Authentication,Socket) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
 writeDisplay("0.00");
    Socket.on('datosBascula', function(data){
			console.log(data);
			 writeDisplay(data);
			 //Socket.emit('lectura','pidiendo datos');
		});

	}
]);
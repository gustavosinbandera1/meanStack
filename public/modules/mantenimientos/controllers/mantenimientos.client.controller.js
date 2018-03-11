'use strict';

// Mantenimientos controller
angular.module('mantenimientos').controller('MantenimientosController', ['$scope', '$stateParams', 'Socket' ,'$location', 'Authentication', 'Mantenimientos', 'TableSettings', 'MantenimientosForm',
	function($scope, $stateParams, Socket,$location, Authentication, Mantenimientos, TableSettings, MantenimientosForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Mantenimientos);
		$scope.mantenimiento = {};

		 var day;
	     $scope.from = new Date(2016,10,24);//para realizar la busqueda por fecha
	     $scope.from.setMonth($scope.from.getMonth()-1);//para inicializar la busqueda 
	     $scope.to = new Date();
	     $scope.from.setHours(0,0,0,0);
	     $scope.to.setHours(0,0,0,0);
	     
	     day =$scope.to.getDate();
	     day = day + 1;//para mostrar los registros hasta la fecha
	     $scope.to.setDate(day);


		Socket.on('mantenimiento.created', function(mantenimiento) {
    		$scope.tableParams.reload();
    		$location.path('mantenimientos');
		});
		Socket.on('mantenimiento.deleted', function(mantenimiento) {
    		$scope.tableParams.reload();
    		$location.path('mantenimientos');

		});
		Socket.on('mantenimiento.updated', function(mantenimiento) {
    		$scope.tableParams.reload();
    		$location.path('mantenimientos');
		});
		Socket.on('datosBascula', function(data){
			console.log(data);
			 writeDisplay(data);
			 $scope.peso = data;
			 //Socket.emit('lectura','pidiendo datos');
		});

	
		
		$scope.conectar = function(){
			console.log('se recibio el evento en el cliente');
			//Socket.emit('lectura','pidiendo datos');
			Socket.connect();
		};
		$scope.desconectar = function(){
			console.log('desconectado');
			//Socket.emit('lectura','pidiendo datos');
			Socket.disconnect();
		};	


		$scope.setFormFields = function(disabled) {
			$scope.formFields = MantenimientosForm.getFormFields(disabled);
		};


		// Create new Mantenimiento
		$scope.create = function() {
			var mantenimiento = new Mantenimientos($scope.mantenimiento);

			// Redirect after save
			mantenimiento.$save(function(response) {
				$location.path('mantenimientos/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Mantenimiento
		$scope.remove = function(mantenimiento) {

			if ( mantenimiento ) {
				mantenimiento = Mantenimientos.get({mantenimientoId:mantenimiento._id}, function() {
					mantenimiento.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.mantenimiento.$remove(function() {
					$location.path('mantenimientos');
				});
			}

		};

		// Update existing Mantenimiento
		$scope.update = function() {
			var mantenimiento = $scope.mantenimiento;

			mantenimiento.$update(function() {
				$location.path('mantenimientos/' + mantenimiento._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewMantenimiento = function() {
			$scope.mantenimiento = Mantenimientos.get( {mantenimientoId: $stateParams.mantenimientoId} );
			$scope.setFormFields(true);
		};

		$scope.toEditMantenimiento = function() {
			$scope.mantenimiento = Mantenimientos.get( {mantenimientoId: $stateParams.mantenimientoId} );
			$scope.setFormFields(false);
		};

	}

]);

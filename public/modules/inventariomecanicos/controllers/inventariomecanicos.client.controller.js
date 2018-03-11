'use strict';

// Inventariomecanicos controller
angular.module('inventariomecanicos').controller('InventariomecanicosController', ['$scope', '$stateParams', 'Socket','$location', 'Authentication', 'Inventariomecanicos', 'TableSettings', 'InventariomecanicosForm',
	function($scope, $stateParams, Socket,$location, Authentication, Inventariomecanicos, TableSettings, InventariomecanicosForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Inventariomecanicos);
		$scope.inventariomecanico = {};

	 var day;
     $scope.from = new Date(2016,10,24);//para realizar la busqueda por fecha
     $scope.from.setMonth($scope.from.getMonth()-1);//para inicializar la busqueda 
     $scope.to = new Date();
     $scope.from.setHours(0,0,0,0);
     $scope.to.setHours(0,0,0,0);
     
     day =$scope.to.getDate();
     day = day + 1;//para mostrar los registros hasta la fecha
     $scope.to.setDate(day);
		
		Socket.on('inventariomecanico.created', function(inventariomecanico) {
    		$scope.tableParams.reload();
    		$location.path('inventariomecanicos');
		});
		Socket.on('inventariomecanico.deleted', function(inventariomecanico) {
    		$scope.tableParams.reload();
    		$location.path('inventariomecanicos');
		});
		Socket.on('inventariomecanico.updated', function(inventariomecanico) {
    		$scope.tableParams.reload();
    		$location.path('inventariomecanicos');
		});
		Socket.on('datosBascula', function(data){
			console.log(data);
			 writeDisplay(data);
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

		$scope.clickPrueba = function(inventariomecanico){
			if($scope.myCheck == true){
				$scope.myCheck = false;
			}else{
				$scope.myCheck = true;
			}
			console.log("este es el nombre");
			console.log(inventariomecanico.name);
			
			

			
		}


		$scope.setFormFields = function(disabled) {
			$scope.formFields = InventariomecanicosForm.getFormFields(disabled);
		};

		$scope.pedirDatos = function(){
			console.log('se recibio el evento en el cliente');
			Socket.emit('lectura','pidiendo datos');
			Socket.disconnect();
		};
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
		// Create new Inventariomecanico
		$scope.create = function() {
			var inventariomecanico = new Inventariomecanicos($scope.inventariomecanico);

			// Redirect after save
			inventariomecanico.$save(function(response) {
				$location.path('inventariomecanicos/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Inventariomecanico
		$scope.remove = function(inventariomecanico) {

			if ( inventariomecanico ) {
				inventariomecanico = Inventariomecanicos.get({inventariomecanicoId:inventariomecanico._id}, function() {
					inventariomecanico.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.inventariomecanico.$remove(function() {
					$location.path('inventariomecanicos');
				});
			}

		};

		// Update existing Inventariomecanico
		$scope.update = function() {
			var inventariomecanico = $scope.inventariomecanico;

			inventariomecanico.$update(function() {
				$location.path('inventariomecanicos/' + inventariomecanico._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewInventariomecanico = function() {
			$scope.inventariomecanico = Inventariomecanicos.get( {inventariomecanicoId: $stateParams.inventariomecanicoId} );
			$scope.setFormFields(true);
		};

		$scope.toEditInventariomecanico = function() {
			$scope.inventariomecanico = Inventariomecanicos.get( {inventariomecanicoId: $stateParams.inventariomecanicoId} );
			$scope.setFormFields(false);
		};

	}

]);

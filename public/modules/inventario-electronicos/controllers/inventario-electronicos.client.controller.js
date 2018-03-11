'use strict';

// Inventario electronicos controller
angular.module('inventario-electronicos').controller('InventarioElectronicosController', ['$scope', '$stateParams','Socket', '$location', 'Authentication', 'InventarioElectronicos', 'TableSettings', 'InventarioElectronicosForm',
	function($scope, $stateParams, Socket, $location, Authentication, InventarioElectronicos, TableSettings, InventarioElectronicosForm,$filter) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(InventarioElectronicos);
		$scope.inventarioElectronico = {};


		 var day;
	     $scope.from = new Date(2016,10,24);//para realizar la busqueda por fecha
	     $scope.from.setMonth($scope.from.getMonth()-1);//para inicializar la busqueda 
	     $scope.to = new Date();
	     $scope.from.setHours(0,0,0,0);
	     $scope.to.setHours(0,0,0,0);
	     
	     day =$scope.to.getDate();
	     day = day + 1;//para mostrar los registros hasta la fecha
	     $scope.to.setDate(day);

		Socket.on('inventarioElectronico.created', function(inventarioElectronico) {
    		$scope.tableParams.reload();
    		$location.path('inventarioElectronicos');
		});
		Socket.on('inventarioElectronico.deleted', function(inventarioElectronico) {
    		$scope.tableParams.reload();
    		$location.path('inventarioElectronicos');
		});
		Socket.on('inventarioElectronico.updated', function(inventarioElectronico) {
    		$scope.tableParams.reload();
    		$location.path('inventarioElectronicos');
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

		

		$scope.setFormFields = function(disabled) {
			$scope.formFields = InventarioElectronicosForm.getFormFields(disabled);
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
/*
		$scope.setFormFields = function(disabled) {
			$scope.formFields = InventarioElectronicosForm.getFormFields(disabled);
		};*/
		$scope.clickPrueba = function(inventarioElectronico){
			if($scope.myCheck == true){
				$scope.myCheck = false;
			}else{
				$scope.myCheck = true;
			}
			console.log("este es el nombre");
			console.log(inventarioElectronico.name);
					
		}

		// Create new Inventario electronico
		$scope.create = function() {
			var inventarioElectronico = new InventarioElectronicos($scope.inventarioElectronico);

			// Redirect after save
			inventarioElectronico.$save(function(response) {
				$location.path('inventario-electronicos/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Inventario electronico
		$scope.remove = function(inventarioElectronico) {

			if ( inventarioElectronico ) {
				inventarioElectronico = InventarioElectronicos.get({inventarioElectronicoId:inventarioElectronico._id}, function() {
					inventarioElectronico.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.inventarioElectronico.$remove(function() {
					$location.path('inventarioElectronicos');
				});
			}

		};

		// Update existing Inventario electronico
		$scope.update = function() {
			var inventarioElectronico = $scope.inventarioElectronico;

			inventarioElectronico.$update(function() {
				$location.path('inventario-electronicos/' + inventarioElectronico._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewInventarioElectronico = function() {
			$scope.inventarioElectronico = InventarioElectronicos.get( {inventarioElectronicoId: $stateParams.inventarioElectronicoId} );
			$scope.setFormFields(true);
		};

		$scope.toEditInventarioElectronico = function() {
			$scope.inventarioElectronico = InventarioElectronicos.get( {inventarioElectronicoId: $stateParams.inventarioElectronicoId} );
			$scope.setFormFields(false);
		};

	}

]);

'use strict';

// Despachoproduccions controller
angular.module('despachoproduccions')
	.controller('DespachoproduccionsController', ['$scope',
		'$rootScope',
		'$stateParams',
		'Socket',
		'$location',
		'Authentication',
		'Despachoproduccions',
		'Customers',
		'GetClients',
		'GetBasculaDespachos',
		'Basculadeliverconfigurations',
		'TableSettings',
		'DespachoproduccionsForm',
		function(
			$scope,
			$rootScope,
			$stateParams,
			Socket,
			$location,
			Authentication,
			Despachoproduccions,
			Customers,
			GetClients,
			GetBasculaDespachos,
			Basculadeliverconfigurations,
			TableSettings,
			DespachoproduccionsForm,
			$filter) {

			var vm = this;
			$scope.authentication = Authentication;
			$scope.tableParams = TableSettings.getParams(Despachoproduccions);
			$scope.despachoproduccion = {};


			var day;
			$scope.from = new Date(2017, 10, 24); //para realizar la busqueda por fecha
			$scope.from.setMonth($scope.from.getMonth() - 1); //para inicializar la busqueda 
			$scope.to = new Date();
			$scope.from.setHours(0, 0, 0, 0);
			$scope.to.setHours(0, 0, 0, 0);
			day = $scope.to.getDate();
			day = day + 1; //para mostrar los registros hasta la fecha
			$scope.to.setDate(day);
			$scope.names = DespachoproduccionsForm.getType();



			$scope.bascuDespachos = {};

			$scope.example = {
				value: 1
			};



			var x = 1,
				y = 1,
				z = 1,
				w = 1;
			vm.update = function() {

				console.log("hola mundo", $scope.selectedItem);
				changeColor($scope.selectedItem);
				//writeDisplay("100.05");
				console.log("vamos a entrar al switch", $scope.selectedItem);
				switch (parseInt($scope.selectedItem)) {
					case 1:
						Socket.on('datosbascula1', function(data) {
							console.log("el dato:", data);
							console.log($scope.selectedItem);
							writeDisplay(data);
							$scope.peso = parseFloat(data); //peso en kilogramos
						});
						Socket.removeAllListeners("datosbascula2");
						Socket.removeAllListeners("datosbascula3");
						Socket.removeAllListeners("datosbascula4");
						break;
					case 2:
						Socket.on('datosbascula2', function(data) {
							console.log("el dato:", data);
							console.log($scope.selectedItem);
							writeDisplay(data);
							$scope.peso = parseFloat(data);

						});
						Socket.removeAllListeners("datosbascula1");
						Socket.removeAllListeners("datosbascula3");
						Socket.removeAllListeners("datosbascula4");
						break;
					case 3:
						Socket.on('datosbascula3', function(data) {
							console.log("el dato:", data);
							writeDisplay(data);
							$scope.peso = parseFloat(data);
						});
						Socket.removeAllListeners("datosbascula1");
						Socket.removeAllListeners("datosbascula2");
						Socket.removeAllListeners("datosbascula4");
						break;
					case 4:
						Socket.on('datosbascula4', function(data) {
							console.log("el dato:", data);
							writeDisplay(data);
							$scope.peso = parseFloat(data);
						});
						Socket.removeAllListeners("datosbascula1");
						Socket.removeAllListeners("datosbascula2");
						Socket.removeAllListeners("datosbascula3");
						break;
				}

			}

			$scope.emitir1 = function() {
				var obj = {};
				obj.Bascula1 = x++;
				Socket.emit('bascula1', obj);

			}

			$scope.emitir2 = function() {
				var obj = {};
				obj.Bascula2 = y++;
				Socket.emit('bascula2', obj);

			}

			$scope.emitir3 = function() {
				var obj = {};
				obj.Bascula3 = z++;
				Socket.emit('bascula3', obj);

			}

			$scope.emitir4 = function() {
				var obj = {};
				obj.Bascula4 = w++;
				Socket.emit('bascula4', obj);

			}


			//esta funcion es llamada desde el  GetClient cuando se resuelve 
			//la promesa callback hell
			//desde el servicio del formulario se procesan todas las entradas
			//del usuario, 
			$scope.setPeso = function() {
				$scope.despachoproduccion.peso_produccion = Math.round($scope.peso * 100) / 100;
				$scope.despachoproduccion.cantidad_produccion = ($scope.despachoproduccion.peso_produccion / $rootScope.pack1.peso_docena) * 100.0 / 100.0;


			}
			$scope.getBasculaDespachos = function(clientes, disabled) {
				GetBasculaDespachos.getAllBasculaDespachos()
					.then(function(basculaDespachos) {
						console.log("los datos de despacho en el controlador");
						console.log(basculaDespachos);
						///los  formularios se procesan dentro del servicio
						vm.despachoFields = DespachoproduccionsForm.getFormFields(disabled, clientes, basculaDespachos);
					});
			};

			$scope.getClients = function(disabled) {
				GetClients.getAllClients()
					.then(function(clientes) { //data contiene los clientes
						console.log("vamos a buscar las configuraciones");
						$scope.getBasculaDespachos(clientes, disabled);
					});
			};

			// Create new Despachoproduccion
			$scope.create = function() {
				var despachar = $scope.despachoproduccion;
				/*----------->*/
				despachar.distribucion = $rootScope.distribution;
				var despachoproduccion = new Despachoproduccions(despachar);
				console.log("datos a guardar:");
				console.dir(despachar);
				//console.log("la distribucion es la siguiente en el controlador",$rootScope.distribution);
				// Redirect after save
				despachoproduccion.$save(function(response) {
					console.log("la respuesta", response);
					//$location.path('despachoproduccions/' + response._id);
					$location.path('despachoproduccions');
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};

			// Remove existing Despachoproduccion
			$scope.remove = function(despachoproduccion) {

				if (despachoproduccion) {
					despachoproduccion = Despachoproduccions.get({
						despachoproduccionId: despachoproduccion._id
					}, function() {
						despachoproduccion.$remove();
						$scope.tableParams.reload();
					});

				} else {
					$scope.despachoproduccion.$remove(function() {
						$location.path('despachoproduccions');
					});
				}

			};

			// Update existing Despachoproduccion
			$scope.update = function() {
				var despachoproduccion = $scope.despachoproduccion;

				despachoproduccion.$update(function() {
					$location.path('despachoproduccions/' + despachoproduccion._id);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};



			$scope.toViewDespachoproduccion = function() {
				console.log("estamos en verDespachoProduccion");
				$scope.despachoproduccion = Despachoproduccions.get({
					despachoproduccionId: $stateParams.despachoproduccionId
				}, function(response) {
					console.log("vamos a revisar el get", response);

				});
				//$scope.setFormFields(true);
				$scope.getClients(true);
			};

			$scope.toEditDespachoproduccion = function() {
				console.log("los datos de la url", $stateParams);
				$scope.despachoproduccion = Despachoproduccions.get({
					despachoproduccionId: $stateParams.despachoproduccionId
				});
				//$scope.setFormFields(false);
				console.log("la produccion", $scope.despachoproduccion);
				$scope.getClients(false);
			};


			Socket.on('despachoproduccion.created', function(despachoproduccion) {
				$scope.tableParams.reload();
				//$location.path('despachoproduccion');
			});
			/*Socket.on('despachoproduccion.deleted', function(despachoproduccion) {
    		$scope.tableParams.reload();
    		$location.path('despachoproduccions');
		});*/
			Socket.on('despachoproduccion.updated', function(despachoproduccion) {
				$scope.tableParams.reload();
				$location.path('despachoproduccions');
			});
			Socket.on('datosBascula', function(data) {
				// data = 130;//esto es solo para pruebas
				writeDisplay(data);
				$scope.peso = parseFloat(data);
				$scope.despachoproduccion.peso_produccion = Math.round($scope.peso * 100) / 100;
			});
			///Socket.emit('lectura', 'pidiendo datos');
			var obj = {};
			obj.Bascula1 = 6.55;
			Socket.emit('lectura', obj);


			$scope.conectar = function() {
				//console.log('se recibio el evento en el cliente');
				//Socket.emit('lectura','pidiendo datos');
				Socket.connect();
			};
			$scope.desconectar = function() {
				//console.log('desconectado');
				//Socket.emit('lectura','pidiendo datos');
				Socket.disconnect();
			};



		}

	]);
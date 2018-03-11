'use strict';

// Basculadeliverconfigurations controller
angular.module('basculadeliverconfigurations')
	.controller('BasculadeliverconfigurationsController', [
		'$scope',
		'$rootScope',
		'$stateParams',
		'Socket',
		'$location',
		'Authentication',
		'Basculadeliverconfigurations',
		'TableSettings',
		'BasculadeliverconfigurationsForm',
		//'SizeProduction2',
		function(
			$scope,
			$rootScope,
			$stateParams,
			Socket,
			$location,
			Authentication,
			Basculadeliverconfigurations,
			TableSettings,
			BasculadeliverconfigurationsForm,
			TypeProduction2,
			//SizeProduction2,
			Genero2) {
			var vm = this;
			$scope.authentication = Authentication;
			$scope.tableParams = TableSettings.getParams(Basculadeliverconfigurations);
			$scope.basculadeliverconfiguration = {};
			var cantidadT = []; //vector que recoje el string de cantidades en forma de objeto
			var basculaconfigurationC = {};

			//writeDisplay("0.00");


			///esta variable esta recien creada
			//$rootScope.peso=180;

			//obtenemos los datos almacenados de la bascula
			var basculaconfigurationT = Basculadeliverconfigurations.get(function() {
				//console.log("datos almacenados de la bascula");
				//console.log("array original", basculaconfigurationT);
				for (i in basculaconfigurationT.results) {
					cantidadT[i] = JSON.parse(basculaconfigurationT.results[i].cantidad_empaque);
					//console.log(cantidadT[i]);	

				}
				//console.log("imprimimos el array");
				//console.log(cantidadT);



				//console.log(basculaconfigurationT.results);
			});
			//crea el objeto JSON como lo requiere MONGODB debido a que el campo cantidad
			//es un objeto json y mongo require un string
			var createDataObject = function(basculadeliverconfiguration) {
				var Tempbasculadeliverconfiguration = {};
				var cantidad = {};
				var basculadeliverconfiguration_ = basculadeliverconfiguration;

				Tempbasculadeliverconfiguration.tipo = basculadeliverconfiguration_.tipo;
				Tempbasculadeliverconfiguration.tipo_empaque = basculadeliverconfiguration_.tipo_empaque;
				Tempbasculadeliverconfiguration.genero = basculadeliverconfiguration.genero;
				Tempbasculadeliverconfiguration.peso_docena = basculadeliverconfiguration_.peso_docena;
				Tempbasculadeliverconfiguration.user = basculadeliverconfiguration_.user;
				Tempbasculadeliverconfiguration._id = basculadeliverconfiguration_._id;


				//Tempbasculadeliverconfiguration.created = basculadeliverconfiguration.created;


				cantidad = {
					"cantidad_23": basculadeliverconfiguration_.cantidad_23,
					"cantidad_25": basculadeliverconfiguration_.cantidad_25,
					"cantidad_27": basculadeliverconfiguration_.cantidad_27,
					"cantidad_29": basculadeliverconfiguration_.cantidad_29,
					"cantidad_31": basculadeliverconfiguration_.cantidad_31,
					"cantidad_33": basculadeliverconfiguration_.cantidad_33,
					"cantidad_35": basculadeliverconfiguration_.cantidad_35,
					"cantidad_37": basculadeliverconfiguration_.cantidad_37,
					"cantidad_39": basculadeliverconfiguration_.cantidad_39,
					"cantidad_41": basculadeliverconfiguration_.cantidad_41,
					"cantidad_43": basculadeliverconfiguration_.cantidad_43

				};
				Tempbasculadeliverconfiguration.cantidad_empaque = JSON.stringify(cantidad);

				return Tempbasculadeliverconfiguration;
			}


			$scope.setFormFields = function(disabled) {
				vm.basculadeliverConfigurationFields = BasculadeliverconfigurationsForm.getFormFields(disabled);
				console.log("vamos a imprimir los campos del formulario");
				console.log(vm.basculadeliverConfigurationFields);
			};

			$scope.setPeso = function() {
				var temp;
				temp = $scope.peso;
				temp = Math.round(temp * 100) / 100;
				//temp = parseFloat(temp).toFixed(2)
				//vm.productionFields.cantidad_produccion = 200;
				$scope.basculadeliverconfiguration.peso_docena = Math.round($scope.peso * 100) / 100;
				//console.log($rootScope.peso);
			};




			Socket.on('produccion.created', function(produccion) {
				//$scope.tableParams.reload();
				//$location.path('produccions');
				console.log("este socket si esta escuchando todo muy bien");
			});
			Socket.on('basculadeliverconfiguration.created', function(basculadeliverconfiguration) {
				$scope.tableParams.reload();
				$location.path('basculadeliverconfigurations');
			});
			Socket.on('basculadeliverconfiguration.deleted', function(basculadeliverconfiguration) {
				$scope.tableParams.reload();
				$location.path('basculadeliverconfigurations');
			});
			Socket.on('basculadeliverconfiguration.updated', function(basculadeliverconfiguration) {
				$scope.tableParams.reload();
				$location.path('basculadeliverconfigurations');
			});
			/*Socket.on('datosBascula', function(data) {
				writeDisplay(data);

				$rootScope.peso = parseFloat(data);
				//console.log("oidos",$rootScope.peso);
				$scope.basculadeliverconfiguration.peso_docena = Math.round($rootScope.peso * 100) / 100;
				///Socket.emit('lectura','pidiendo datos');
			});
			//Socket.emit('lectura', 'pidiendo datos');
			*/

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



			// Create new Basculaconfiguration
			$scope.create = function() {
				/*
				var Tempbasculadeliverconfiguration = {};
				var cantidad = {};
				var basculadeliverconfiguration = new Basculadeliverconfigurations($scope.basculadeliverconfiguration);
				
				Tempbasculadeliverconfiguration.tipo = basculadeliverconfiguration.tipo;
				Tempbasculadeliverconfiguration.tipo_empaque = basculadeliverconfiguration.tipo_empaque;
				Tempbasculadeliverconfiguration.genero = basculadeliverconfiguration.genero;
				Tempbasculadeliverconfiguration.peso_docena = basculadeliverconfiguration.peso_docena;
				Tempbasculadeliverconfiguration.user = basculadeliverconfiguration.user;
				Tempbasculadeliverconfiguration._id = basculadeliverconfiguration._id;


				//Tempbasculadeliverconfiguration.created = basculadeliverconfiguration.created;


				cantidad = {
					"cantidad_23": basculadeliverconfiguration.cantidad_23,
					"cantidad_25": basculadeliverconfiguration.cantidad_25,
					"cantidad_27": basculadeliverconfiguration.cantidad_27,
					"cantidad_29": basculadeliverconfiguration.cantidad_29,
					"cantidad_31": basculadeliverconfiguration.cantidad_31,
					"cantidad_33": basculadeliverconfiguration.cantidad_33,
					"cantidad_35": basculadeliverconfiguration.cantidad_35,
					"cantidad_37": basculadeliverconfiguration.cantidad_37,
					"cantidad_39": basculadeliverconfiguration.cantidad_39,
					"cantidad_41": basculadeliverconfiguration.cantidad_41,
					"cantidad_43": basculadeliverconfiguration.cantidad_43

				};
				Tempbasculadeliverconfiguration.cantidad_empaque = JSON.stringify(cantidad);

				*/

				//createDataObject();
				///////////////////////////////////////////////////hasta aqui la funcion/////
				//var basculadeliverconfigurationt = new Basculadeliverconfigurations(Tempbasculadeliverconfiguration);
				var basculadeliverconfigurationt = new Basculadeliverconfigurations(createDataObject($scope.basculadeliverconfiguration));
				basculadeliverconfigurationt.$save(function(response) {
					if (response.data != undefined) {
						alert("el registro ya existe");
					} else {
						$location.path('basculadeliverconfigurations/' + response._id);


					}
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
				// }
			};

			// Remove existing Basculaconfiguration
			$scope.remove = function(basculadeliverconfiguration) {
				console.log("antes del dato: ");
				console.log(basculadeliverconfiguration);
				if (basculadeliverconfiguration) {
					basculadeliverconfiguration = Basculadeliverconfigurations.get({
						basculadeliverconfigurationId: basculadeliverconfiguration._id
					}, function() {
						//console.log("dato importante:  ");
						//console.log(basculadeliverconfiguration);
						basculadeliverconfiguration.$remove();
						//console.log("hora de recargar la pagina");
						$scope.tableParams.reload();
						$location.path('basculadeliverconfigurations');
					});

				} else {
					$scope.basculadeliverconfiguration.$remove(function() {
						$location.path('produccions');
					});
				}
			};

			// Update existing Basculaconfiguration
			$scope.update = function() {
				//var basculadeliverconfiguration = $scope.basculadeliverconfiguration;
				var basculadeliverconfigurationT = new Basculadeliverconfigurations(createDataObject($scope.basculadeliverconfiguration));
				//console.log("esto es lo que vamos a editar",basculadeliverconfiguration);
				//console.log("esto es lo que se reorganizo",basculadeliverconfigurationP);

				basculadeliverconfigurationT.$update(function() {
					$location.path('basculadeliverconfigurations/' + basculadeliverconfigurationT._id);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};



			$scope.toViewBasculaconfiguration = function() {
				console.log("vamos a ver el formulario de la  bascula");
				$scope.basculadeliverconfiguration = Basculadeliverconfigurations.get({
					basculadeliverconfigurationId: $stateParams.basculadeliverconfigurationId
				});
				$scope.setFormFields(true);

			};

			$scope.toEditBasculaconfiguration = function() {

				console.log("vamos a editar el formulario de la bascula");
				$scope.basculadeliverconfiguration = Basculadeliverconfigurations.get({
					basculadeliverconfigurationId: $stateParams.basculadeliverconfigurationId
				});
				$scope.setFormFields(false);
			};

		}

	]);
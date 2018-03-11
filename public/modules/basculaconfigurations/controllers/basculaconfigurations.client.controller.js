'use strict';

// Basculaconfigurations controller
angular.module('basculaconfigurations')
	.controller('BasculaconfigurationsController', [
		'$scope',
		'$stateParams',
		'Socket',
		'$location',
		'Authentication',
		'Basculaconfigurations',
		'TableSettings',
		'BasculaconfigurationsForm',
		'TypeProduction4',
		'SizeProduction1',
		'Generos_',
		function(
			$scope,
			$stateParams,
			Socket,
			$location,
			Authentication,
			Basculaconfigurations,
			TableSettings,
			BasculaconfigurationsForm,
			TypeProduction1,
			SizeProduction1,
			Genero1) {

			var vm = this;
			$scope.authentication = Authentication;
			$scope.tableParams = TableSettings.getParams(Basculaconfigurations);
			//recoje los datos del formulario
			$scope.basculaconfiguration = {};
			//writeDisplay("0.00");
			//obtenemos las configuraciones existentes 
			var basculaconfigurationC = Basculaconfigurations.get(function() {

				console.log("dato Almacenado  ");
				console.log(basculaconfigurationC.results);

			});

			var day;
			$scope.from = new Date(2016, 10, 24); //para realizar la busqueda por fecha
			$scope.from.setMonth($scope.from.getMonth() - 1); //para inicializar la busqueda 
			$scope.to = new Date();
			$scope.from.setHours(0, 0, 0, 0);
			$scope.to.setHours(0, 0, 0, 0);

			day = $scope.to.getDate();
			day = day + 1; //para mostrar los registros hasta la fecha
			$scope.to.setDate(day);



			$scope.getFormFields = function(disabled) {
				var basculaConfigurationFields = [{
						key: 'tipo',
						type: 'select',
						templateOptions: {
							label: 'Tipo de produccion',
							required: true,
							disabled: disabled,
							// Call our province service to get a list
							// of types of task 
							options: TypeProduction1.getType()
						}
					}, {
						key: 'genero',
						type: 'select',
						templateOptions: {
							label: 'Genero',
							required: true,
							disabled: disabled,
							// Call our Genero service to get a list
							// of generos
							options: Genero1.getGeneros()
						},
						expressionProperties: {
							hide: '!model.tipo',

						}
					}, {
						key: 'tamano',
						type: 'select',
						templateOptions: {
							label: 'Tamaño',
							required: true,
							disabled: disabled,
							// Call our Genero service to get a list
							// of generos
							options: SizeProduction1.getSize()
						},
						expressionProperties: {
							hide: '!model.tipo',

						}
					}, {
						key: 'peso_docena',
						type: 'input',
						templateOptions: {
							label: 'Peso Docena :',
							required: true,
							disabled: disabled
						},
						expressionProperties: {
							hide: '!model.tipo',
						}
					},

				];

				return basculaConfigurationFields;
			}; //fin function



			$scope.setFormFields = function(disabled) {
				vm.basculaConfigurationFields = $scope.getFormFields(disabled);
			};

			$scope.setPeso = function() {
				var temp;
				temp = $scope.peso;
				temp = Math.round(temp * 100) / 100;
				//temp = parseFloat(temp).toFixed(2)
				//vm.productionFields.cantidad_produccion = 200;
				$scope.basculaconfiguration.peso_docena = Math.round($scope.peso * 100) / 100;
				console.log($scope.peso);
			};



			Socket.on('basculaconfiguration.created', function(basculaconfiguration) {
				$scope.tableParams.reload();
				$location.path('basculaconfigurations');
			});
			Socket.on('basculaconfiguration.deleted', function(basculaconfiguration) {
				$scope.tableParams.reload();
				$location.path('basculaconfigurations');
			});
			Socket.on('basculaconfiguration.updated', function(basculaconfiguration) {
				$scope.tableParams.reload();
				$location.path('basculaconfigurations');
			});
			Socket.on('datosBascula', function(data) {
				//	console.log(data);
				writeDisplay(data);
				$scope.peso = data;
				//Socket.emit('lectura','pidiendo datos');
			});


			$scope.conectar = function() {
				console.log('se recibio el evento en el cliente');
				//Socket.emit('lectura','pidiendo datos');
				Socket.connect();
			};
			$scope.desconectar = function() {
				console.log('desconectado');
				//Socket.emit('lectura','pidiendo datos');
				Socket.disconnect();
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



			// Create new Basculaconfiguration
			$scope.create = function() {
				var configExist = false;
				var basculaconfiguration = new Basculaconfigurations($scope.basculaconfiguration);
				//revisams si el registro existe o no para poder crearlo sin repetir	
				for (var i = 0; i < basculaconfigurationC.results.length; i++) {
					if ((basculaconfigurationC.results[i].tipo == basculaconfiguration.tipo) && (basculaconfigurationC.results[i].tamano == basculaconfiguration.tamano) && (basculaconfigurationC.results[i].genero == basculaconfiguration.genero)) {
						configExist = true;
						console.log("Se encontro coincidencia, no se puede crear el dato");
						alert("el dato ya existe");
					}
				}

				// Redirect after save
				if (!configExist) {
					basculaconfiguration.$save(function(response) {
						$location.path('basculaconfigurations/' + response._id);
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				}
			};

			// Remove existing Basculaconfiguration
			$scope.remove = function(basculaconfiguration) {
				console.log("antes del dato: ");
				console.log(basculaconfiguration);
				if (basculaconfiguration) {
					basculaconfiguration = Basculaconfigurations.get({
						basculaconfigurationId: basculaconfiguration._id
					}, function() {
						console.log("dato importante:  ");
						console.log(basculaconfiguration);
						basculaconfiguration.$remove();
						$scope.tableParams.reload();
					});

				} else {
					$scope.basculaconfiguration.$remove(function() {
						$location.path('basculaconfigurations');
					});
				}

			};

			// Update existing Basculaconfiguration
			$scope.update = function() {
				var basculaconfiguration = $scope.basculaconfiguration;

				basculaconfiguration.$update(function() {
					$location.path('basculaconfigurations/' + basculaconfiguration._id);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};



			$scope.toViewBasculaconfiguration = function() {
				$scope.basculaconfiguration = Basculaconfigurations.get({
					basculaconfigurationId: $stateParams.basculaconfigurationId
				});
				$scope.setFormFields(true);
			};

			$scope.toEditBasculaconfiguration = function() {
				$scope.basculaconfiguration = Basculaconfigurations.get({
					basculaconfigurationId: $stateParams.basculaconfigurationId
				});
				$scope.setFormFields(false);
			};

		}

	]);
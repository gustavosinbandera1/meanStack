'use strict';

// Materiaprimas controller
angular.module('materiaprimas').controller('MateriaprimasController', ['$scope', '$stateParams', '$location','Socket', 'Authentication', 'Materiaprimas', 'TableSettings', 'MateriaprimasForm',
	function($scope, $stateParams, $location,Socket, Authentication, Materiaprimas, TableSettings, MateriaprimasForm,$filter ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Materiaprimas);
		$scope.materiaprima = {};
		$scope.names = ["ESPANSON", "EVA", "PVC", "FOMI",""];
		
		
		$scope.materiaprima1 = {};//no se usa


		  ///variables para el filtro de la busqueda en ng-repeat
		    $scope.myName;//variable para realizar la busqueda por nombre

		    var day;
     $scope.from = new Date(2016,10,24);//para realizar la busqueda por fecha
     $scope.from.setMonth($scope.from.getMonth()-1);//para inicializar la busqueda 
     $scope.to = new Date();
     $scope.from.setHours(0,0,0,0);
     $scope.to.setHours(0,0,0,0);
     
     day =$scope.to.getDate();
     day = day + 1;//para mostrar los registros hasta la fecha
     $scope.to.setDate(day);



		Socket.on('materiaprima.created', function(materiaprima) {
			console.log("nuevo materiaprima");
    		console.log(materiaprima);
    		$scope.tableParams.reload();
    		$location.path('materiaprimas');
		});
		Socket.on('materiaprima.deleted', function(materiaprima) {
			console.log("materiaprima eliminado");
    		console.log(materiaprima);
    		$scope.tableParams.reload();
    		$location.path('materiaprimas');
		});
		Socket.on('materiaprima.updated', function(materiaprima) {
			console.log("materiaprima actualizado");
    		console.log(materiaprima);
    		$scope.tableParams.reload();
    		$location.path('materiaprimas');
		});

		$scope.setFormFields = function(disabled) {
			$scope.formFields = MateriaprimasForm.getFormFields(disabled);
		};


		// Create new Materiaprima
		$scope.create = function() {
			
			var materiaprima = new Materiaprimas($scope.materiaprima);

			// Redirect after save
			materiaprima.$save(function(response) {
				$location.path('materiaprimas/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Materiaprima
		$scope.remove = function(materiaprima) {

			if ( materiaprima ) {
				materiaprima = Materiaprimas.get({materiaprimaId:materiaprima._id}, function() {
					materiaprima.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.materiaprima.$remove(function() {
					$location.path('materiaprimas');
				});
			}

		};
		$scope.clickPrueba = function(materiaprima){
			if($scope.myCheck == true){
				$scope.myCheck = false;
			}else{
				$scope.myCheck = true;
			}
			/*console.log("este es el nombre");
			console.log(materiaprima.name);*/
			$scope.materiaprima1.name = materiaprima.name;
			

			
		}

		// Update existing Materiaprima
		$scope.update = function() {
			var materiaprima = $scope.materiaprima;

			materiaprima.$update(function() {
				$location.path('materiaprimas/' + materiaprima._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewMateriaprima = function() {
			$scope.materiaprima = Materiaprimas.get( {materiaprimaId: $stateParams.materiaprimaId} );
			$scope.setFormFields(true);
		};

		$scope.toEditMateriaprima = function() {
			$scope.materiaprima = Materiaprimas.get( {materiaprimaId: $stateParams.materiaprimaId} );
			$scope.setFormFields(false);
		};

		$scope.prueba = function(elm){
			/*
			if(typeof elm === "undefined")
			{
				console.log('error');
			return 0;
			}
			else{
				console.log("elemento");
			console.log(elm[4].name);
			console.log(i);

				return elm[4].name;
			}*/
		};

		

	}

]);
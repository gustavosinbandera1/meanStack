

'use strict';

// Produccions controller
angular.module('produccioncompanies')
.controller('ProduccioncompaniesController', 
  [
  '$scope', 
  '$stateParams',
  'Socket', 
  '$location', 
  'Authentication', 
  'Produccioncompanies', 
  'Basculaconfigurations', 
  'TableSettings',
  'Genero1',
  'TypeProduction1',
  'SizeProduction1',
	 function($scope, 
    $stateParams, 
    Socket, 
    $location, 
    Authentication, 
    Produccioncompanies, 
    Basculaconfigurations, 
    TableSettings,  
    Genero, 
    TypeProduction,
    SizeProduction,
    $filter){
		var vm = this;
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Produccioncompanies);
		 writeDisplay("0.00");
     
    //modelo de la vista, recoje los datos de la vista en formlyForm
		$scope.produccioncompany = {};
    $scope.names = TypeProduction.getType();
    $scope.myName;//opcion para el filtro de busqueda
   
		//cada que carguemos este controlador obtendremos el listado de 
    //configuraciones de la bascula
    $scope.bascula_configurations = Basculaconfigurations.get(function(){
        //podemos poner codigo cuando el servidor responda 
      });

    var day;
     $scope.from = new Date(2017,8,24);//para realizar la busqueda por fecha
     $scope.from.setMonth($scope.from.getMonth()-1);//para inicializar la busqueda 
     $scope.to = new Date();
     $scope.from.setHours(0,0,0,0);
     $scope.to.setHours(0,0,0,0);
     
     day =$scope.to.getDate();
    // day = day + 1;//para mostrar los registros hasta la fecha
     //$scope.to.setDate(day);

		$scope.getFormFields = function(disabled){
			var	produccioncompanyFields  = [
		{
          key: 'tipo',
          type: 'select',
          templateOptions: {
            label: 'Tipo de produccion',
            required: true,
            disabled: disabled,
             options: TypeProduction.getType()
          }
        },

        {
            key: 'cantidad_produccion',
            type: 'input',
            templateOptions: {
              label: 'Cantidad en docenas :',
               required: true,
               disabled: disabled,
               type:'number'
              //disabled: false
            },
            expressionProperties: {
             hide: '!model.tipo',
         
         }
          },

        

          {
            key: 'peso_produccion',
            type: 'input',
            templateOptions: {
              label: 'Peso Produccion :',
              disabled: disabled,
              type:'number'
            },
            expressionProperties: {
             hide: '!model.tipo',
         
         }
          },
          {
          key: 'genero',
          type: 'select',
          templateOptions: {
            label: 'Genero',
            required: true,
            disabled: disabled,
            // Call our Genero service to get a list
            // of generos
             options: Genero.getGeneros()
          },
          expressionProperties: {
             hide: '!model.tipo',
         
         }
        },

        {
          key: 'tamano',
          type: 'select',
          templateOptions: {
            label: 'Tamaño',
            required: true,
            disabled: disabled,
            // Call our Genero service to get a list
            // of generos
             options: SizeProduction.getSize()
          },
          expressionProperties: {
             hide: '!model.tipo',
         
         }
        }
		];

		return produccioncompanyFields;
		   
		};



		$scope.setFormFields = function(disabled){
			vm.produccioncompanyFields = $scope.getFormFields(disabled);
		};
		
		$scope.setPeso = function(){
       //writeDisplay("100.05");
      //capturamos el peso de la bascula
			$scope.produccioncompany.peso_produccion = Math.round($scope.peso*100)/100
     /*en este punto el usuario ya selecciono el tipo de produccion 
     y desea establecer el peso 
     debemos buscar dicha seleccion en la base de datos(cosa que hacemos al cargar el controlador) y ver si ya se configuro
     la bascula para dicha produccion.
     Luego si el elemento existe buscamos el peso por docena en dicho objeto e
     interpolamos el campo de cantidad_docenas, simplemente dividiendo 
     el peso actual por el prso por docena

     */
     //alert();
      
      for(i in $scope.bascula_configurations.results){

          console.log($scope.bascula_configurations.results[i].tipo);
//si tenemos configurada la bascula con el tipo de produccion que se desea almacenar
          if($scope.produccioncompany.tipo == $scope.bascula_configurations.results[i].tipo){ 
           //cantidad en docenas = peso total/peso de una docena; la cual esta almacenada en la configuracion de la bascula,y redondeamos la cifra
            $scope.produccioncompany.cantidad_produccion =Math.round(($scope.produccioncompany.peso_produccion/$scope.bascula_configurations.results[i].peso_docena)*100)/100;
            alert($scope.produccioncompany.cantidad_produccion);
          }

         } 
		};




		Socket.on('produccioncompany.created', function(produccioncompany) {
    		$scope.tableParams.reload();
    		$location.path('produccioncompanies');
		});
		Socket.on('produccioncompany.deleted', function(produccioncompany) {
    		$scope.tableParams.reload();
    		$location.path('produccioncompanies');

		});
		Socket.on('produccioncompany.updated', function(produccioncompany) {
    		$scope.tableParams.reload();
    		$location.path('produccioncompanies');
		});
		Socket.on('datosBascula', function(data){
			console.log(data);
			 writeDisplay(data);
			 $scope.peso = data;//peso en kilogramos
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
		
		// Create new Produccion
		$scope.create = function() {
			var produccioncompany = new Produccioncompanies($scope.produccioncompany);

			// Redirect after save
			produccioncompany.$save(function(response) {
				$location.path('produccioncompanies/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Produccion
		$scope.remove = function(produccioncompany) {

			if ( produccioncompany ) {
				produccioncompany = Produccioncompanies.get({produccioncompanyId:produccioncompany._id}, function() {
					produccioncompany.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.produccioncompany.$remove(function() {
					$location.path('produccioncompanies');
				});
			}

		};

		// Update existing Produccion
		$scope.update = function() {
			var produccioncompany = $scope.produccioncompany;

			produccioncompany.$update(function() {
				$location.path('produccioncompanies/' + produccioncompany._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewProduccion = function() {
			$scope.produccioncompany = Produccioncompanies.get( {produccioncompanyId: $stateParams.produccioncompanyId} );
			$scope.setFormFields(true);
			
		};

		$scope.toEditProduccion = function() {
			$scope.produccioncompany = Produccioncompanies.get( {produccioncompanyId: $stateParams.produccioncompanyId} );
			$scope.setFormFields(false);
			
		};

	}

]);

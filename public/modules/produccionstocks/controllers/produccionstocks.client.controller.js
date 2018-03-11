'use strict';

// Produccions controller
angular.module('produccionstocks')
.controller('ProduccionstocksController', 
  [
  '$scope', 
  '$stateParams',
  'Socket', 
  '$location', 
  'Authentication', 
  'Produccionstocks', 
  'TableSettings',
  'Genero',
  'TypeProduction',
  'SizeProduction',
  'ColorProduction',
   function($scope, 
    $stateParams, 
    Socket, 
    $location, 
    Authentication, 
    Produccionstocks,  
    TableSettings,  
    Genero, 
    TypeProduction,
    SizeProduction,
    ColorProduction,
    $filter){
    var vm = this;
    $scope.authentication = Authentication;
    $scope.tableParams = TableSettings.getParams(Produccionstocks);
   /* 
     var produccionstockC = Produccionstocks.get(function() {
          
        console.log("dato del stock ");
          console.log(produccionstockC.results);
    
        });*/
   
    //modelo de la vista, recoje los datos de la vista en formlyForm
    $scope.produccionstock = {};
    $scope.names = TypeProduction.getType();
    $scope.myName;
   

    var day;
     $scope.from = new Date(2016,10,24);//para realizar la busqueda por fecha
     $scope.from.setMonth($scope.from.getMonth()-1);//para inicializar la busqueda 
     $scope.to = new Date();
     //$scope.from.setHours(0,0,0,0);
     //$scope.to.setHours(0,0,0,0);
     

    $scope.getFormFields = function(disabled){
      var productionstockFields  = [
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
             hide: 'model.tipo =="empaque" || !model.tipo',
         
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
             hide: 'model.tipo =="empaque" || !model.tipo',
         
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
             hide: 'model.tipo =="empaque" || !model.tipo',
         
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
          }
    ];

    return productionstockFields;
       
    };



    $scope.setFormFields = function(disabled){
      vm.productionstockFields = $scope.getFormFields(disabled);
    };
    
    
    Socket.on('produccionstock.created', function(produccion) {
        $scope.tableParams.reload();
       // $location.path('produccions');
    });
    Socket.on('produccionstock.deleted', function(produccion) {
        $scope.tableParams.reload();
       // $location.path('produccions');

    });
    Socket.on('produccionstock.updated', function(produccion) {
        $scope.tableParams.reload();
        //$location.path('produccions');
    });
   
    // Create new Produccion
  /*  $scope.create = function() {
      var produccionstock = new Produccionstocks($scope.produccionstock);
      alert("se va a crear un elemento");
      // Redirect after save
      produccionstock.$save(function(response) {
        $location.path('produccionstocks/' + response._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };*/

    // Remove existing Produccion
   /* $scope.remove = function(produccionstock) {

      if ( produccionstock ) {
        produccionstock = Produccionstocks.get({produccionstockId:produccionstock._id}, function() {
          produccionstock.$remove();
          $scope.tableParams.reload();
        });

      } else {
        $scope.produccionstock.$remove(function() {
          $location.path('produccionstocks');
        });
      }

    };*/

    // Update existing Produccion
    $scope.update = function() {
      var produccionstock = $scope.produccionstock;

      produccionstock.$update(function() {
        $location.path('produccionstocks/' + produccionstock._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };



    $scope.toViewProduccion = function() {
      $scope.produccionstock = Produccionstocks.get( {produccionstockId: $stateParams.produccionstockId} );
      $scope.setFormFields(true);
      
    };

    $scope.toEditProduccion = function() {
      $scope.produccionstock = Produccionstocks.get( {produccionstockId: $stateParams.produccionstockId} );
      $scope.setFormFields(false);
      
    };

  }

]);

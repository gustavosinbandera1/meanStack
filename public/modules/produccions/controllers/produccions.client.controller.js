'use strict';

// Produccions controller
angular.module('produccions')
  .controller('ProduccionsController', [
    '$scope',
    '$rootScope',
    '$stateParams',
    'Socket',
    '$location',
    'Authentication',
    'Produccions',
    'GetBasculaIngresos',
    'TableSettings',
    'ProduccionForms',
    function($scope,
      $rootScope,
      $stateParams,
      Socket,
      $location,
      Authentication,
      Produccions,
      GetBasculaIngresos,
      TableSettings,
      ProduccionForms,
      $filter) {
      var vm = this;
      $scope.authentication = Authentication;
      $scope.tableParams = TableSettings.getParams(Produccions);

      $scope.names = ProduccionForms.getType();

      console.log("datos de la tabla");
      console.log($scope.tableParams);

      //modelo de la vista, recoje los datos de la vista en formlyForm
      $scope.produccion = {};
      var day;
      $scope.from = new Date(2016, 10, 24); //para realizar la busqueda por fecha
      $scope.from.setMonth($scope.from.getMonth() - 1); //para inicializar la busqueda 
      $scope.to = new Date();
      $scope.from.setHours(0, 0, 0, 0);
      $scope.to.setHours(0, 0, 0, 0);
      day = $scope.to.getDate();
      day = day + 1; //para mostrar los registros hasta la fecha
      $scope.to.setDate(day);
      //$scope.selectedItem = 1;

      $scope.getBasculaIngresos = function(disabled) {
        GetBasculaIngresos.getAllBasculaIngresos()
          .then(function(basculaingresos) {
            ///los  formularios se procesan dentro del servicio
            vm.produccionFields = ProduccionForms.getFormFields(disabled, basculaingresos);
          
          });
      };

      /*$scope.getFormFields = function(disabled) {
        var produccionFields = ProduccionForms.getFormFields(disabled);
        return produccionFields;
      };*/
      /*
            $scope.setFormFields = function(disabled) {
              vm.productionFields = $scope.getFormFields(disabled);
            };*/
var x=1,y=1,z=1,w=1;
      vm.update = function() {

        console.log("hola mundo", $scope.selectedItem);
        changeColor($scope.selectedItem);
        //writeDisplay("100.05");
        console.log("vamos a entrar al switch",$scope.selectedItem);
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

      $scope.emitir1 = function(){
         var obj = {};
      obj.Bascula1 = x++;
      Socket.emit('bascula1', obj);

      }

       $scope.emitir2 = function(){
         var obj = {};
      obj.Bascula2 = y++;
      Socket.emit('bascula2', obj);

      }

       $scope.emitir3 = function(){
         var obj = {};
      obj.Bascula3 = z++;
      Socket.emit('bascula3', obj);

      }

       $scope.emitir4 = function(){
         var obj = {};
      obj.Bascula4 = w++;
      Socket.emit('bascula4', obj);

      }

      $scope.setPeso = function() {
     
        
        //capturamos el peso de la bascula
        $scope.produccion.peso_produccion = Math.round($scope.peso * 100) / 100;
        $scope.produccion.cantidad_produccion = ($scope.produccion.peso_produccion / $rootScope.pack.peso_docena);
      };



      Socket.on('produccion.created', function(produccion) {
        $scope.tableParams.reload();
        console.log("escuchamos el evento produccion creada");
        //$location.path('produccions');
      });
      Socket.on('produccion.deleted', function(produccion) {
        $scope.tableParams.reload();
        // $location.path('produccions');

      });
      Socket.on('produccion.updated', function(produccion) {
        $scope.tableParams.reload();
        //$location.path('produccions');
      });



/*
      Socket.on('datosbascula1', function(data) {
        console.log("el dato:", data);
        writeDisplay(data);
        $scope.peso = parseFloat(data); //peso en kilogramos

        //$scope.produccion.peso_produccion = Math.round($scope.peso * 100) / 100;
      });*/

     



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

      // Create new Produccion
      $scope.create = function() {
        var produccion = new Produccions($scope.produccion);
        console.log("datos de la produccion");
        console.log($scope.produccion);
        // Redirect after save
        produccion.$save(function(response) {
          //$location.path('produccions/' + response._id);
          $location.path('produccions');
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      // Remove existing Produccion
      $scope.remove = function(produccion) {

        if (produccion) {
          produccion = Produccions.get({
            produccionId: produccion._id
          }, function() {
            produccion.$remove();
            $scope.tableParams.reload();
          });

        } else {
          $scope.produccion.$remove(function() {
            $location.path('produccions');
          });
        }

      };

      // Update existing Produccion
      $scope.update = function() {
        var produccion = $scope.produccion;

        produccion.$update(function() {
          $location.path('produccions/' + produccion._id);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };



      $scope.toViewProduccion = function() {
        $scope.produccion = Produccions.get({
          produccionId: $stateParams.produccionId
        });
        $scope.getBasculaIngresos(true);

      };

      $scope.toEditProduccion = function() {
        $scope.produccion = Produccions.get({
          produccionId: $stateParams.produccionId
        });
        $scope.getBasculaIngresos(false);

      };

    }

  ]);
(function() {
    'use strict';

    angular
        .module('customers')
        .factory('CustomersForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
  				{
  					key: 'name',
  					type: 'input',
  					templateOptions: {
  			      label: 'Nombre Cliente:',
  						disabled: disabled,
              placeholder:"ingrese el nombre del cliente" 
  			    }
  				},
         /* {
            key: 'apellido',
            type: 'input',
            templateOptions: {
              label: 'Apellido Cliente:',
              disabled: disabled,
              placeholder:"ingrese el apellido del cliente" 
            },
            expressionProperties: {
             hide: '!model.name',
         
         }
          },*/
          {
            key: 'state',
            type: 'input',
            templateOptions: {
              label: 'Ciudad :',
              disabled: disabled,
              placeholder:"Ciudad de destino"
              //
            },
          expressionProperties: {
             hide: '!model.name ',
         
         }
          },
         /* {
            key: 'address',
            type: 'input',
            templateOptions: {
              label: 'Direccion:',
              disabled: disabled,
              placeholder:"Ingrese la direccion"
            },
          expressionProperties: {
             hide: '!model.name || !model.state',
         
         }
          },
          
          {
            key: 'tel',
            type: 'input',
            templateOptions: {
              label: 'Telefono:',
              placeholder:"ingrese el Telefono",
              disabled: disabled
            },
          expressionProperties: {
             hide: '!model.name || !model.address || !model.state',
         
         }
          }*/
         

  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();

(function() {
    'use strict';

    angular
        .module('inventario-electronicos')
        .factory('InventarioElectronicosForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
  				{
  					key: 'name',
  					type: 'input',
  					templateOptions: {
  			      label: 'Name:',
  						disabled: disabled
  			    }
  				},
          {
            key: 'cantidad',
            type: 'input',
            templateOptions: {
              label: 'Cantidad:',
              disabled: disabled
            }
          },
          {
            key: 'descripcion',
            type: 'input',
            templateOptions: {
              label: 'descripcion:',
              disabled: disabled
            }
          }

  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();

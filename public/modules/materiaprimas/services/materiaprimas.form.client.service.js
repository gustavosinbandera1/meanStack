(function() {
    'use strict';

    angular
        .module('materiaprimas')
        .factory('MateriaprimasForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
  	   {
      key: "name",
    type: "select",
    templateOptions: {
      disabled: disabled,
      label: "tipo de material?",
      options: [
        {
          name: "Goma de Eva",
          value: "EVA"
        },
        {
          name: "Espanson",
          value: "ESPANSON"
        },
        {
          name: "Pvc",
          value: "PVC"
        },
        {
          name: "fomi",
          value: "FOMI"
        }
      ]
    }
  },


          {
            key: 'color',
            type: 'input',
            templateOptions: {
              label: 'Color:',
              disabled: disabled
            }
          },
          {
            key: 'tipo',
            type: 'input',
            templateOptions: {
              label: 'Tipo:',
              disabled: disabled
            }
          },
          {
            key: 'cantidad',
            type: 'input',
            templateOptions: {
              label: 'Cantidad:',
              disabled: disabled,
              type:'number'
            }
          },


  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();

(function() {
    'use strict';

    angular
        .module('basculaconfigurations')
        .factory('BasculaconfigurationsForm', factory);


    angular
        .module('basculaconfigurations')
        .factory('TypeProduction4', getType);   
      angular
        .module('basculaconfigurations')
        .factory('SizeProduction1', getSize); 
      angular  
      .module('basculaconfigurations')
        .factory('Generos_', generos); 




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
  				}

  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

   function getType() {
            function getType() {
                return [
              {
                name: "Ballana-Estampada",
                value: 'ballana-estampada'
              },
              {
                name: "Iris",
                value: 'iris'
              },
              {
                name: "Ballana-Sencilla",
                value:"ballana-sencilla"
              },
              {
                name:"Freest",
                value:"freest"
              },
              {
                name:"Pvc-Transparente",
                value:"pvc-transparente"
              },
              {
                name:"Brenda-Corazon",
                value:"brenda-corazon"
              },
              {
                name:"Nohelia-Estampada",
                value:"nohelia-estampada"
              },
              {
                name:"Raid-Estampada",
                value:"raid-estampada"
              },
              {
                name:"Raid-Sencilla",
                value:"raid-sencilla"
              },
              
              {
                name:"Trebol-Dama",
                value:"trebol-dama"
              },
              {
                name:"Huellas-Niño",
                value:"huellas-niño"
              },
              {
                name:"Huellas-Dama",
                value:"huellas-dama"
              },
              {
                name:"Tp-Malla",
                value:"tp-malla"
              },
              {
                name:"Bicolor-Junior",
                value:"bicolor-junior"
              },
              {
                name:"Bicolor-Hombre",
                value:"bicolor-hombre"
              },
              {
                name:"Tp-Sand",
                value:"tp-sand"
              },
              {
                name:"Mocasin",
                value:"mocasin"
              },
              {
                name:"Only-Hombre",
                value:"only-hombre"
              },
              {
                name:"Only-Dama",
                value:"only-dama"
              },
              {
                name:"Only-Niño",
                value:"only-niño"
              },
              {
                name:"Sueco-Botin",
                value:"sueco-botin"
              },
              {
                name:"Sport-Hombre",
                value:"sport-hombre"
              },
              {
                name:"Sport-Dama",
                value:"sport-dama"
              },
              {
                name:"Sport-Niño",
                value:"sport-niño"
              },
              {
                name:"Sueco-Clasico",
                value:"sueco-clasico"
              },
              {
                name:"Sueco-Correa-Niño",
                value:"sueco-correa-niño"
              },
              {
                name:"Sueco-Correa-Dama",
                value:"sueco-correa-dama"
              },
              {
                name:"Sueco-Correa-Hombre",
                value:"sueco-correa-hombre"
              },
              {
                name: "Espanson-Boom",
                value: 'espanson-boom'
              },
              {
                name: "Espanson-Brisa",
                value: 'espanson-brisa'
              },
              {
                name: "Espanson-gato",
                value: 'espanson-gato'
              },
              {
                name: "Espanson-Cruzada",
                value: 'espanson-cruzada'
              },
              {
                name: "Espanson-Herradura",
                value: 'espanson-herradura'
              },
              {
                name: "Espanson-Bahia",
                value: 'espanson-bahia'
              },
              {
                name: "Tpl-Tres-Puntadas",
                value: 'Tpl-tres-puntadas'
              },
              {
                name: "Tp-Walk",
                value: 'Tp-walk'
              },
              {
                name: "Trebol-Dama",
                value: 'trebol-dama'
              },
              {
                name: "Clasica",
                value: 'clasica'
              },

              
              {
                name: "",
                value: ""
              },
                ];
            }

            return {
                getType: getType
            }
        }


      function getSize() {
            function getSize() {
                return [
                   {
                name: "27",
                value: '27'
              },
              {
                name: "29",
                value: '29'
              },
              {
                name: "31",
                value: '31'
              },
              {
                name: "33",
                value: '33'
              },
              {
                name: "35",
                value: '35'
              },
              {
                name: "37",
                value: '37'
              },
              {
                name: "39",
                value: '39'
              },
              {
                name: "41",
                value: '41'
              },
              {
                name: "43",
                value: '43'
              }
                ];
            }

            return {
                getSize: getSize
            }
        }

      function generos() {
            function getGeneros() {
              return [
              {
                name: "Caballero",
                value: 'caballero'
              },
              {
                name: "Dama",
                value: 'dama'
              },
              {
                name: "Niño",
                value: 'nino'
              },
              {
                name: "Niña",
                value: 'nina'
              },
                ];
            }

            return {
                getGeneros: getGeneros
            }
        }

  

})();

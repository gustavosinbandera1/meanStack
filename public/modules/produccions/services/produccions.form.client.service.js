(function() {
  'use strict';

  angular
    .module('produccions')
    .factory('ProduccionForms', factory);
  angular
    .module('produccions')
    .factory('GetBasculaIngresos', getBasculaIngresosService);



  function getBasculaIngresosService(Basculaconfigurations, $q) {
    return {
      getAllBasculaIngresos: getAllBasculaIngresos
    }

    function getAllBasculaIngresos() {
      var defered = $q.defer();
      var promise = defered.promise;

      var basculaingresos = Basculaconfigurations.get(function() {
        defered.resolve(basculaingresos);
      });
      return promise;
    }

  }


  var filtrarConfiguracionBascula = function(object, state, bascula) {
    var estado = state.current.name; //url actual
    //contiene el objeto que se va a 
    //utilizar de la bascula para calcular la cantidad
    //si estamos en dicho estado filtramos los campor para encontrar
    //la configuracion

    var modelo = object.model;
    var temp = [];
    var basculaFilterData = [];
    var temp2 = [];

    //if (estado == 'createProduccion' ||  estado =='editProduccion') {
    console.log("el objeto: ", modelo);
    console.log("la bascula", bascula);

    if (modelo.tipo != undefined) { //ya se definio el primer campo
      //aplicamos filtro por tipo  al objeto de la bascula 

      for (i in bascula.results) {
        if (bascula.results[i].tipo == modelo.tipo) {
          basculaFilterData[i] = bascula.results[i];

        }
      }
    }



    if (modelo.genero != undefined) {
      var k = 0;
      for (var j in basculaFilterData) {
        //en este mundo debemos haber encontrado el tipo 
        //de empaque si es que existe, para poder extraer 
        //las cantidades por talla
        if (basculaFilterData[j].genero == modelo.genero) {
          // console.log("encontramos el dato");
          //console.log(temp[i]);
          console.log("cincidencia");

          temp[k] = basculaFilterData[j];
          k++;

        }
      }
    }


    if (modelo.tamano != undefined) {
      //temp = basculaFilterData;
      basculaFilterData = [];
      k = 0;

      for (i in temp) {
        if (temp[i].tamano == modelo.tamano) {
          basculaFilterData[0] = temp[i];
          k++;
        }
      }
    }

    //} //fin if(state ==)

    return basculaFilterData[0];
  };

  var getTypePacks = function(configsBascula) {
    var typePacks = []; //tipos de empaques

    for (i in configsBascula.results) {
      typePacks[i] = {
        'tipo_empaque': configsBascula.results[i].tipo,
        '_id': configsBascula.results[i]._id,
      };
    }
    return typePacks;
  };

  function factory($state, $rootScope) {
    var getFormFields = function(disabled, configsBascula) {

      var pack = []; //almacenamos el objeto bascula que se devuelve del filtro
      //que aplicamos a basculaingresos

      var fields = [{
          key: 'tipo',
          type: 'select',
          templateOptions: {
            label: 'Tipo de produccion',
            required: true,
            disabled: disabled,
            options: getType()
          },
          expressionProperties: {
            'templateOptions.onChange': function($viewValue, $modelValue, scope) {
              var estado = $state.current.name;

              // if (estado == 'createProduccion' || estado =='editProduccion') {
              pack = filtrarConfiguracionBascula(scope, $state, configsBascula);
              console.log("retornando del filtro", pack);

              if (pack == 0 || pack == undefined || pack == []) {
                scope.form.$invalid = true;
                //$rootScope.pack = undefined;
                console.log(scope.form.$invalid);
                //alert("La configuracion de bascula no existe");
              }

              if (scope.model.genero != undefined) {
                if (pack != 0 && pack != undefined) {
                  console.log("pack es diferente de cero", (scope.model.peso_produccion * 2));
                  //scope.model.cantidad_produccion = (scope.model.peso_produccion / pack.peso_docena) * 100.0 / 100.0;

                  scope.form.$invalid = false;
                  $rootScope.pack = pack;


                } else {
                  scope.form.$invalid = true;
                  console.log(scope.form.$invalid);
                  //alert("La configuracion de bascula no existe");
                  scope.model.cantidad_produccion = undefined;
                  //$rootScope.pack = undefined;
                }
              }

              if (scope.model.tamano == undefined) {
                scope.model.cantidad_produccion = undefined;
                scope.form.$invalid = true;
              }



              // }
              /* if(estado =='editProduccion'){
                 console.log("editando......................",pack);
                 scope.model.cantidad_produccion = (scope.model.peso_produccion / pack.peso_docena)*100.0/100.0 ;
                     
               }*/
            }
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
            options: getGeneros()
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
            options: getSize()
          },
          expressionProperties: {
            hide: 'model.tipo =="empaque" || !model.tipo',

          }
        }, {
          key: 'peso_produccion',
          type: 'input',
          templateOptions: {
            label: 'Peso Produccion :',
            disabled: disabled,
            type: 'number'
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
            type: 'number'
            //disabled: false
          },
          expressionProperties: {
            hide: '!model.tipo',

          }
        }
      ];
      return fields;
    };


    var getType = function() {
      return [{
          name: "Ballana-Estampada",
          value: 'ballana-estampada'
        }, {
          name: "Iris",
          value: 'iris'
        }, {
          name: "Ballana-Sencilla",
          value: "ballana-sencilla"
        }, {
          name: "Freest",
          value: "freest"
        }, {
          name: "Pvc-Transparente",
          value: "pvc-transparente"
        }, {
          name: "Brenda-Corazon",
          value: "brenda-corazon"
        }, {
          name: "Nohelia-Estampada",
          value: "nohelia-estampada"
        }, {
          name: "Raid-Estampada",
          value: "raid-estampada"
        }, {
          name: "Raid-Sencilla",
          value: "raid-sencilla"
        },

        {
          name: "Trebol-Dama",
          value: "trebol-dama"
        }, {
          name: "Huellas-Niño",
          value: "huellas-niño"
        }, {
          name: "Huellas-Dama",
          value: "huellas-dama"
        }, {
          name: "Tp-Malla",
          value: "tp-malla"
        }, {
          name: "Bicolor-Junior",
          value: "bicolor-junior"
        }, {
          name: "Bicolor-Hombre",
          value: "bicolor-hombre"
        }, {
          name: "Tp-Sand",
          value: "tp-sand"
        }, {
          name: "Mocasin",
          value: "mocasin"
        }, {
          name: "Only-Hombre",
          value: "only-hombre"
        }, {
          name: "Only-Dama",
          value: "only-dama"
        }, {
          name: "Only-Niño",
          value: "only-niño"
        }, {
          name: "Sueco-Botin",
          value: "sueco-botin"
        }, {
          name: "Sport-Hombre",
          value: "sport-hombre"
        }, {
          name: "Sport-Dama",
          value: "sport-dama"
        }, {
          name: "Sport-Niño",
          value: "sport-niño"
        }, {
          name: "Sueco-Clasico",
          value: "sueco-clasico"
        }, {
          name: "Sueco-Correa-Niño",
          value: "sueco-correa-niño"
        }, {
          name: "Sueco-Correa-Dama",
          value: "sueco-correa-dama"
        }, {
          name: "Sueco-Correa-Hombre",
          value: "sueco-correa-hombre"
        }, {
          name: "Espanson-Boom",
          value: 'espanson-boom'
        }, {
          name: "Espanson-Brisa",
          value: 'espanson-brisa'
        }, {
          name: "Espanson-gato",
          value: 'espanson-gato'
        }, {
          name: "Espanson-Cruzada",
          value: 'espanson-cruzada'
        }, {
          name: "Espanson-Herradura",
          value: 'espanson-herradura'
        }, {
          name: "Espanson-Bahia",
          value: 'espanson-bahia'
        }, {
          name: "Tpl-Tres-Puntadas",
          value: 'Tpl-tres-puntadas'
        }, {
          name: "Tp-Walk",
          value: 'Tp-walk'
        }, {
          name: "Trebol-Dama",
          value: 'trebol-dama'
        }, {
          name: "Clasica",
          value: 'clasica'
        }, {
          name: "Clasica-Boton",
          value: 'clasica-boton'
        },

        {
          name: "",
          value: ""
        },
      ];
    }



    var service = {
      getFormFields: getFormFields,
      getType: getType,
    };
    return service;
  }


  function getGeneros() {
    return [{
      name: "Caballero",
      value: 'caballero'
    }, {
      name: "Dama",
      value: 'dama'
    }, {
      name: "Niño",
      value: 'nino'
    }, {
      name: "Niña",
      value: 'nina'
    }, ];
  }



  function getSize() {
    return [{
      name: "27",
      value: '27'
    }, {
      name: "29",
      value: '29'
    }, {
      name: "31",
      value: '31'
    }, {
      name: "33",
      value: '33'
    }, {
      name: "35",
      value: '35'
    }, {
      name: "37",
      value: '37'
    }, {
      name: "39",
      value: '39'
    }, {
      name: "41",
      value: '41'
    }, {
      name: "43",
      value: '43'
    }, {
      name: '',
      value: ''
    }];
  }



})();
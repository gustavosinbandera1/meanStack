(function() {
  'use strict';

  angular
    .module('basculadeliverconfigurations')
    .factory('BasculadeliverconfigurationsForm', factory);

  /*angular
    .module('basculadeliverconfigurations')
    .factory('SizeProduction2', getSize);*/

  function getType() {
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
      },
      {
        name: "Espanson-Herradura",
        value: 'espanson-herradura'
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
        name: "Espanson-Bahia",
        value: 'espanson-bahia'
      },
      {
        name: "Clasica",
        value: 'clasica'
      },
       {
        name: "Clasica-Boton",
        value: 'clasica-boton'
      },
      {
        name: "Sueco-Mocasin",
        value: 'sueco-mocasin'
      },
       {
        name: "Sueco-Botin",
        value: 'sueco-botin'
      },
      {
        name: "",
        value: ""
      },
    ];
  }

  function checkQuantity(scope) {

    var cuantity = scope.model.cantidad_23 +
      scope.model.cantidad_25 + scope.model.cantidad_27 +
      scope.model.cantidad_29 +
      scope.model.cantidad_31 + scope.model.cantidad_33 +
      scope.model.cantidad_35 + scope.model.cantidad_37 +
      scope.model.cantidad_39 + scope.model.cantidad_41 +
      scope.model.cantidad_43;
    console.log("estoy sumando", cuantity);
    return cuantity;
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
    },
    {
      name: "Dama-Caballero",
      value: 'dama-caballero'
    }

     ];
  }

  //function toLowerCase(value) {
  //return (value || '').toLowerCase();
  //}
  function toLowerCase(value) {
    //console.log("probando toLowerCase");
    return (value || '').toLowerCase();
  }



  function factory($rootScope, $state) {


    var getFormFields = function(disabled) {
      var estado = $state.current.name; //url actual
      var fields =
        [

          {
            key: 'tipo',
            type: 'select',
            templateOptions: {
              label: 'Tipo de produccion',
              required: true,
              disabled: disabled,
              options: getType(),

            },
            expressionProperties: {
              //en esta parte del codigo vamos a realizar la verificacion el formulario
              //la suma de la cantidad de calzado , no puede superar
              //la docena
              'templateOptions.onChange': function($viewValue, $modelValue, scope) {

                //console.log("la cantidad total es : ",checkQuantity(scope));
              }

            },
            validators: {
              validar: function($viewValue, $modelValue, scope) {
                var value = $modelValue || $viewValue;
                //var value = true;
                //console.log("estamos validando");
                if (value) {
                  // validateDriversLicence(value)
                  //aqui podemmos validar el campo del formulario
                  return true;

                }

              }
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (newValue) {
                  //scope.model.peso_docena= $rootScope.peso;
                  //scope.model.tipo_empaque = toLowerCase(newValue);
                  //console.log("probando",newValue);
                }
              }
            },
            controller: function($scope) {
              //console.log("estamos en primer controlador");
              //console.log($scope.model);
              $scope.model.cantidad_23 = 0;
              $scope.model.cantidad_25 = 0;
              $scope.model.cantidad_27 = 0;
              $scope.model.cantidad_29 = 0;
              $scope.model.cantidad_31 = 0;
              $scope.model.cantidad_33 = 0;
              $scope.model.cantidad_35 = 0;
              $scope.model.cantidad_37 = 0;
              $scope.model.cantidad_39 = 0;
              $scope.model.cantidad_41 = 0;
              $scope.model.cantidad_43 = 0;
            }
          },

          {
            key: 'tipo_empaque',
            type: 'input',
            templateOptions: {
              label: 'Tipo de empaque',
              required: true,
              disabled: disabled,
            },
            expressionProperties: {
              hide: '!model.tipo',

            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (newValue) {
                  //console.log("cambio el tipo de empaque");
                  // scope.model.peso_docena= $rootScope.peso;
                  scope.model.tipo_empaque = toLowerCase(newValue);
                }
              }
            },
            controller: function($scope) {
              //console.log("este codigo solo corre una vez");
              //console.log($state.current);
              /*  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
    $state.previous = fromState;
    console.log("el estado cambio");
  });*/
              //$state.reload();
            }



          },

          {
            key: 'peso_docena',
            type: 'input',
            templateOptions: {
              label: 'Peso Docena :',
              required: true,
              disabled: disabled,
              type: 'number'
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
              options: getGeneros()
            },
            expressionProperties: {
              hide: '!model.tipo',
              /* 'templateOptions.label': function($viewValue, $modelValue, scope) {
                  if(scope.model.tipo === 'sueco-botin') {
                      return 'esta prueba';
                  }
                  return scope.model.tipo;
              }*/
              'templateOptions.onChange': function($viewValue, $modelValue, scope) {
                //console.log("algo cambio",scope.model);
              }

            }
          },
          ///falta el campo cantidad_empaque de mongo
          //el cual es un json que incluye informacion
          //de cuantos pares y que talla de produccion
          //para el despacho de la docena
          //desde el cliente debemos crear el formulario para 
          //crear el json y agregarlo a la informacion que 
          //le enviamos al servidor 
          {
            key: 'cantidad_23',
            type: 'input',
            templateOptions: {
              label: 'Cantidad #23 :',
              //required:true,
              disabled: disabled,
              type: 'number'
            },
            expressionProperties: {
              hide: '!model.tipo',
              'templateOptions.focus': function() {
                // console.log("tengo el focus");
              }
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (estado == 'createBasculadeliverconfiguration' || estado == 'editBasculadeliverconfiguration') {
                  if (newValue) {
                    scope.model.cantidad_23 = newValue;
                    if (checkQuantity(scope) != 12) {
                      scope.form.$invalid = true;
                    } else {
                      scope.form.$invalid = false;
                    }
                  }
                }
              }
            }
          },

          {
            key: 'cantidad_25',
            type: 'input',
            templateOptions: {
              label: 'Cantidad #25 :',
              //required:true,
              disabled: disabled,
              type: 'number'
            },
            expressionProperties: {
              hide: '!model.tipo',
              'templateOptions.focus': function() {
                // console.log("tengo el focus");
              }
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (estado == 'createBasculadeliverconfiguration' || estado == 'editBasculadeliverconfiguration') {
                  if (newValue) {
                    scope.model.cantidad_25 = newValue;
                    if (checkQuantity(scope) != 12) {
                      scope.form.$invalid = true;
                    } else {
                      scope.form.$invalid = false;
                    }
                  }
                }
              }
            }
          },

          {
            key: 'cantidad_27',
            type: 'input',
            templateOptions: {
              label: 'Cantidad #27 :',
              //required:true,
              disabled: disabled,
              type: 'number'
            },
            expressionProperties: {
              hide: '!model.tipo',
              'templateOptions.focus': function() {
                // console.log("tengo el focus");
              }
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (estado == 'createBasculadeliverconfiguration' || estado == 'editBasculadeliverconfiguration') {
                  if (newValue) {
                    scope.model.cantidad_27 = newValue;
                    if (checkQuantity(scope) != 12) {
                      scope.form.$invalid = true;
                    } else {
                      scope.form.$invalid = false;
                    }
                  }
                }
              }
            }
          },



          {
            key: 'cantidad_29',
            type: 'input',
            templateOptions: {
              label: 'Cantidad #29 :',
              //required:true,
              disabled: disabled,
              type: 'number'
            },
            expressionProperties: {
              hide: '!model.tipo',
              'templateOptions.focus': function() {
                // console.log("tengo el focus");
              }
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (estado == 'createBasculadeliverconfiguration' || estado == 'editBasculadeliverconfiguration') {
                  if (newValue) {
                    scope.model.cantidad_29 = newValue;
                    if (checkQuantity(scope) != 12) {
                      scope.form.$invalid = true;
                    } else {
                      scope.form.$invalid = false;
                    }
                  }
                }
              }
            }
          },


          {
            key: 'cantidad_31',
            type: 'input',
            templateOptions: {
              label: 'Cantidad #31 :',
              //required:true,
              disabled: disabled,
              type: 'number'
            },
            expressionProperties: {
              hide: '!model.tipo',
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (estado == 'createBasculadeliverconfiguration' || estado == 'editBasculadeliverconfiguration') {
                  if (newValue) {
                    scope.model.cantidad_31 = newValue;
                    if (checkQuantity(scope) != 12) {
                      scope.form.$invalid = true;
                    } else {
                      scope.form.$invalid = false;
                    }

                  }
                }
              }
            }
          },


          {
            key: 'cantidad_33',
            type: 'input',
            templateOptions: {
              label: 'Cantidad #33 :',
              //required:true,
              disabled: disabled,
              type: 'number'
            },
            expressionProperties: {
              hide: '!model.tipo',
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (estado == 'createBasculadeliverconfiguration' || estado == 'editBasculadeliverconfiguration') {
                  if (newValue) {
                    scope.model.cantidad_33 = newValue;
                    if (checkQuantity(scope) != 12) {
                      scope.form.$invalid = true;
                    } else {
                      scope.form.$invalid = false;
                    }
                  }
                }
              }
            }
          },


          {
            key: 'cantidad_35',
            type: 'input',
            templateOptions: {
              label: 'Cantidad #35 :',
              //required:true,
              disabled: disabled,
              type: 'number'
            },
            expressionProperties: {
              hide: '!model.tipo',
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (estado == 'createBasculadeliverconfiguration' || estado == 'editBasculadeliverconfiguration') {
                  if (newValue) {
                    scope.model.cantidad_35 = newValue;
                    if (checkQuantity(scope) != 12) {
                      scope.form.$invalid = true;
                    } else {
                      scope.form.$invalid = false;
                    }
                  }
                }
              }
            }
          },


          {
            key: 'cantidad_37',
            type: 'input',
            templateOptions: {
              label: 'Cantidad #37 :',
              //required:true,
              disabled: disabled,
              type: 'number'
            },
            expressionProperties: {
              hide: '!model.tipo',
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (estado == 'createBasculadeliverconfiguration' || estado == 'editBasculadeliverconfiguration') {
                  if (newValue) {
                    scope.model.cantidad_37 = newValue;
                    if (checkQuantity(scope) != 12) {
                      scope.form.$invalid = true;
                    } else {
                      scope.form.$invalid = false;
                    }
                  }
                }
              }
            }
          },

          {
            key: 'cantidad_39',
            type: 'input',
            templateOptions: {
              label: 'Cantidad #39 :',
              //required:true,
              disabled: disabled,
              type: 'number'
            },
            expressionProperties: {
              hide: '!model.tipo',
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (estado == 'createBasculadeliverconfiguration' || estado == 'editBasculadeliverconfiguration') {
                  if (newValue) {
                    scope.model.cantidad_39 = newValue;
                    if (checkQuantity(scope) != 12) {
                      scope.form.$invalid = true;
                    } else {
                      scope.form.$invalid = false;
                    }
                  }
                }
              }
            }
          },

          {
            key: 'cantidad_41',
            type: 'input',
            templateOptions: {
              label: 'Cantidad #41 :',
              //required:true,
              disabled: disabled,
              type: 'number'
            },
            expressionProperties: {
              hide: '!model.tipo',
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {

                if (estado == 'createBasculadeliverconfiguration' || estado == 'editBasculadeliverconfiguration') {
                  if (newValue) {
                    scope.model.cantidad_41 = newValue;
                    if (checkQuantity(scope) != 12) {
                      scope.form.$invalid = true;
                    } else {
                      scope.form.$invalid = false;
                    }
                  }
                }
              }
            }
          },

          {
            key: 'cantidad_43',
            type: 'input',
            templateOptions: {
              label: 'Cantidad #43 :',
              //required:true,
              disabled: disabled,
              type: 'number'
            },
            expressionProperties: {
              hide: '!model.tipo',
            },
            watcher: {
              listener: function(field, newValue, oldValue, scope, stopWatching) {
                if (estado == 'createBasculadeliverconfiguration' || estado == 'editBasculadeliverconfiguration') {
                  if (newValue) {
                    scope.model.cantidad_43 = newValue;
                    if (checkQuantity(scope) != 12) {
                      scope.form.$invalid = true;
                    } else {
                      scope.form.$invalid = false;
                    }
                  }
                }
              }
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


/*
  function getSize() {
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
      }];
    }

    return {
      getSize: getSize
    }
  }*/

  function generos() {
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

    return {
      getGeneros: getGeneros
    }
  }



})();
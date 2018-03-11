(function() {
  'use strict';

  angular
    .module('despachoproduccions')
    .factory('DespachoproduccionsForm', factory);

  angular
    .module('despachoproduccions')
    .factory('GetClients', getClientsService);

  angular
    .module('despachoproduccions')
    .factory('GetBasculaDespachos', getBasculaDespachosService)



  var getSize = function() {

    return [{
      name: "23",
      value: '23'
    }, {

      name: "25",
      value: '25'
    }, {

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

  var getGeneros = function() {
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

  function getBasculaDespachosService(Basculadeliverconfigurations, $q) {
    return {
      getAllBasculaDespachos: getAllBasculaDespachos
    }

    function getAllBasculaDespachos() {
      var defered = $q.defer();
      var promise = defered.promise;

      var basculadespachos = Basculadeliverconfigurations.get(function() {
        defered.resolve(basculadespachos);
      });
      return promise;
    }

  }

  function getClientsService(Customers, $q) {
    return {
      getAllClients: getAllClients
    }

    function getAllClients() {
      var defered = $q.defer();
      var promise = defered.promise;

      var customers = Customers.get(function() {
        defered.resolve(customers);
      });
      return promise;
    }
  }



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
      },

      /* {
         name: "",
         value: ""
       },*/
    ];
  }

  //me devuelve un vector de objetos con la cantidad de 
  //pares por talla configurados en la bascula de despachos,
  //para cada uno de los tipos de produccion y tipo de empaque
  //la informacion obtenida aqui es producto de lo que se configura
  //en la bascula de despachos 
  /* getQuantityPacks = function(basculaDespachos) {
     var packs = [];//cantidades por talla en una docena

     for (i in basculaDespachos.results) {
       //console.log(JSON.parse(basculaDespachos.results[i].cantidad_empaque));
       packs[i] = JSON.parse(basculaDespachos.results[i].cantidad_empaque);
     }
     return packs;
   }*/

  var getTypePacks = function(configsBascula) {
    var typePacks = []; //tipos de empaques

    for (i in configsBascula.results) {
      typePacks[i] = {
        'tipo_empaque': configsBascula.results[i].tipo_empaque,
        '_id': configsBascula.results[i]._id,
      };
    }
    return typePacks;
  };

  var filtrarConfiguracionBascula = function(object, state, bascula) {
    var estado = state.current.name; //url actual
    //contiene el objeto que se va a 
    //utilizar de la bascula para calcular la cantidad
    //si estamos en dicho estado filtramos los campor para encontrar
    //la configuracion
    var modelo = object.model;
    var temp = [];
    var basculaFilterData = [];

    if (estado == 'createDespachoproduccion') {


      if (modelo.tipo != undefined) { //ya se definio el primer campo
        //aplicamos filtro por tipo  al objeto de la bascula 

        for (i in bascula.results) {
          if (bascula.results[i].tipo == modelo.tipo) {
            basculaFilterData[i] = bascula.results[i];
          }
        }
        //console.log("los datos antes de filtrar: ");
        //console.log(basculaFilterData);

        if (modelo.tipo_empaque != undefined) {
          for (var j in basculaFilterData) {
            if (basculaFilterData[j].tipo_empaque == modelo.tipo_empaque) {
              temp[j] = basculaFilterData[j];

            }
          }
        }

        if (modelo.genero != undefined) {
          basculaFilterData = []; //limpiamos la variable
          for (i in temp) {
            //en este mundo debemos haber encontrado el tipo 
            //de empaque si es que existe, para poder extraer 
            //las cantidades por talla
            if (temp[i].genero == modelo.genero) {
              console.log("encontramos el dato");
              console.log(temp[i]);
              basculaFilterData[0] = temp[i]
            }
          }
        }
      }


    }
    return basculaFilterData[0];
  };
  //podemos quitar el escope si no enviamos la cantidad de rroduccion'por la distribucion
  var extraerDistribucion = function(pack, scope) { //recibe un estring con la distribucionpor tallas
    //se debe pasar a json y extraer los valors diferentes e cero
    var obj = {};
    var results = [];
    var temp = [];
    console.log("esta es la distribucion del pack", pack);
    console.log("este es el modelo,", scope.model);
    obj = JSON.parse(pack.cantidad_empaque);
    //console.log("este es el objeto", obj);
    //console.log("esta son las claves: ",Object.keys(obj));
    //console.log("estos son los valores",Object.values(obj));
    //console.log("los valores");
    for (var i in obj) {
      results.push([i, obj[i]]);
    }

    //console.log(results);
    //console.log("las variables");
    for (var i = 0; i < results.length; i++) {
      for (var j = 0; j < 2; j++) {
        if (j % 2 != 0) { //si j es impar, para ver los valores y no las claves
          if (results[i][j] != 0) { //aplicamos filtro para eliminar los valores iguales a cero
            var size = results[i][0].substring(9, 11); //para extraer los dos ultimos caracteres de name, que corresponde a la talla
            temp.push({
              name: results[i][0],
              value: results[i][1],
              tamano: size, //size contiene un estring como '35','37' etc para realizar una busqueda en el stock
              tipo: pack.tipo,
              cantidad: results[i][1],
              genero: pack.genero,
              // cantidad_docenas:scope.model.cantidad_produccion,
            });
          }
        }
      }
    }
    //console.log("el resultado es : ", temp);

    return temp;
  }



  function factory($state, $rootScope) {

    var mostrarCantidadTotal = function(distribucion, scope) {
      var cadena = "";
      var cadena2 = "se va  a descontar: "
      console.log("procesando distribucion", distribucion);

      for (var i in distribucion) {
        cadena += distribucion[i].cantidad * scope.model.cantidad_produccion + " pares  de talla " + distribucion[i].tamano + " + ";
        //console.log("se va a descontar " , distribucion[i].cantidad*scope.model.cantidad_produccion , "unidades  de talla " , distribucion[i].talla);
        //alert("se va a descontar " + distribucion[i].cantidad*scope.model.cantidad_produccion +"unidades de talla " + distribucion[i].talla)
      }
      //alert(cadena2 + cadena);
    }


    //data representa los datos de los clientes
    var getFormFields = function(disabled, data, configsBascula) {
      //console.log("vamos a captar los datos de bascula en el servicio");
      //console.log(configsBascula);
      var len = data.results.length;
      var clients = [];
      var distribucion = []; //almacena la distribucion de cantidad por talla del objeto seleccionado por el cliente, despues de aplicar el filtro
      var pack; //almacenamos el onjeto bascula que se devuelve del filtro
      var typePacks = getTypePacks(configsBascula); //almacena los tipos de empaque
      var lenType = typePacks.length;
      var typeOptions = []; //tipo de empaques de la bascula de despachos
      $rootScope.distribution = [];

      var getTransportes = function() {
        return [{
          name: "Envia",
          value: 'envia'
        }, {
          name: "Servientrega",
          value: 'servientrega'
        }, {
          name: "Deprisa",
          value: 'deprisa'
        }, {
          name: "Rapidisimo",
          value: 'rapidisimo'
        }, ];
      }


      for (var i = 0; i < len; i++) {
        clients.push({
          name: data.results[i].name,
          value: data.results[i]._id,

        });
      }
      /* clients.push({
         name: "",
         value: "",
       });*/

      for (var i = 0; i < lenType; i++) {
        typeOptions.push({
          name: typePacks[i].tipo_empaque + " ", //las comillas son por error de render 
          value: typePacks[i].tipo_empaque
        });
      }
      

             
       
      var fields = [{
          key: 'tipo',
          type: 'select',
          templateOptions: {
            label: 'Tipo de producto',
            required: true,
            disabled: disabled,
            options: getType(),
          },
          expressionProperties: {
            'templateOptions.distribucion': function($viewValue, $modelValue, scope) {
              //debemos extraer la distribucion de medidas y cantidad de calzado por docena
              // console.log("detectando cambios en la nueva funcion",pack);
              var estado = $state.current.name;

              if (estado == 'createDespachoproduccion') {

                console.log("se produjeron cambios");
                //no es necesario llenar el campo ciudad
                scope.model.clienteCiudad = "no escriba nada";
                
              

                //console.log("se esta disparando un evento", estado);

                pack = filtrarConfiguracionBascula(scope, $state, configsBascula);
                console.log("retornando del filtro", pack);


                if (pack == 0 || pack == undefined || pack == []) {
                  scope.form.$invalid = true;
                  console.log(scope.form.$invalid);
                  //alert("La configuracion de bascula no existe");
                }



                if (scope.model.genero != undefined) {
                  if (pack != 0 && pack != undefined) {
                    console.log("pack es diferente de cero");
                    //scope.model.cantidad_produccion = Math.round((scope.model.peso_produccion / pack.peso_docena) * 100) / 100;
                    distribucion = extraerDistribucion(pack, scope);
                    $rootScope.distribution = distribucion; //esto lo utilizamos en el controlador de este modulo
                    $rootScope.pack1 = pack;
                    scope.form.$invalid = false;
                    console.log("la distribucion es : ", distribucion);
                    if (scope.model.cliente != undefined) {
                      mostrarCantidadTotal(distribucion, scope);
                    }
                    //aqui debemos inyectar un servicio que se comunique con
                    //el stock y descuente los productos necesarios, antes de crear
                    //dicho despacho se debe verificar que si se tenga el stock suficiente
                  } else {
                    scope.form.$invalid = true;
                    $rootScope.pack1 = undefined;
                    console.log(scope.form.$invalid);
                    alert("La configuracion de bascula no existe");
                    scope.model.cantidad_produccion = undefined;
                  }


                  if (scope.model.cantidad_produccion == undefined ||
                    scope.model.cantidad_produccion == '' ||
                    scope.model.cliente == '' ||
                    scope.model.transportadora == '') {
                    scope.form.$invalid = true;
                  }

                }


              }
            }
          }
        },

        {
          key: 'tipo_empaque',
          type: 'select',
          templateOptions: {
            label: 'Tipo de empaque',
            required: true,
            disabled: disabled,
            options: typeOptions
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
            options: getGeneros()
          },
          expressionProperties: {
            hide: '!model.tipo || !model.tipo_empaque',

          }
        },

        {
          key: 'peso_produccion',
          type: 'input',
          templateOptions: {
            label: 'Peso Produccion :',
            required: true,
            disabled: disabled,
            type: 'number'
          },
          expressionProperties: {
            hide: ' !model.tipo || !model.tipo_empaque || !model.genero ',

          }
        },

        { //cantidad en docenas que se calcula a partir del peso
          //apartir e este valor ebemos armar un paquete JSON
          //para enviarle al servidor la cantidad por talla 
          //que se debe descontar del stock 
          key: 'cantidad_produccion',
          type: 'input',
          templateOptions: {
            label: 'Cantidad en docenas:',
            required: true,
            disabled: disabled,
            type: 'number'
          },
          expressionProperties: {
            hide: '!model.tipo || !model.tipo_empaque || !model.genero || !model.peso_produccion ',
          }
        },

        {
          key: 'cliente',
          type: 'select',
          templateOptions: {
            label: 'Nombre del Cliente',
            required: true,
            disabled: disabled,
            options: clients //options: array
          },
          expressionProperties: {
            
            hide: '!model.tipo || !model.tipo_empaque || !model.genero || !model.peso_produccion || !model.cantidad_produccion',
          }
        },

        {
          key: 'clienteCiudad', //esta clave debe coincidir con la que envio desde el servidor
          type: 'input',
          templateOptions: {
            label: 'Ciudad:',
            disabled: disabled,
            required: false
          },
          expressionProperties: {
            hide: '!model.tipo || !model.tipo_empaque || !model.genero || !model.peso_produccion || !model.cantidad_produccion || !model.cliente',
          }
        },
        {
          key: 'transportadora',
          type: 'select',
          templateOptions: {
            label: 'Transportadora',
            required: true,
            disabled: disabled,
            options: getTransportes()
          },
          expressionProperties: {
            hide: '!model.tipo || !model.tipo_empaque || !model.genero || !model.peso_produccion || !model.cantidad_produccion || !model.cliente',// || !model.clienteCiudad',
          }
        },

      ];
      return fields;
    };

    
    var service = {
      getFormFields: getFormFields,
      getType: getType,
    };

    return service;

  }

})();
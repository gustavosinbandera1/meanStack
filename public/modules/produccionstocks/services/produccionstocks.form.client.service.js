
(function() {
    'use strict';


     angular
        .module('produccionstocks')
        .factory('Genero', generos);

      angular
        .module('produccionstocks')
        .factory('TypeProduction', getType);   
      angular
        .module('produccions')
        .factory('SizeProduction', getSize); 
       angular
        .module('produccions')
        .factory('ColorProduction', getColor);   


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
                  name: "Clasica-Boton",
                  value: 'clasica-boton'
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



        function getColor() {
            function getColor() {
                return [
              {
                name: "Amarillo-Azul",
                value: 'amarillo-azul',
                "group": "ballana-estampada"
              },
              {
                name: "Rojo-Negro",
                value: 'rojo-negro',
                 "group": "ballana-estampada"
              },
              {
                name: "Negro-Gris",
                value:"negro-gris",
                 "group": "ballana-estampada"
              },
              {
                name:"Verde-Negro",
                value:"verde-negro",
                 "group": "ballana-estampada"
              },
              {
                name:"Cafe-Blanco",
                value:"cafe-blanco",
                 "group": "ballana-estampada"
              },
              {
                name:"Azul-Verde",
                value:"azul-verde",
                "group":"Iris"
              },
              {
                name:"Fuxia-Negro",
                value:"fuxia-negro",
                "group":"Iris"
                 
              },
              {
                name:"Salmon-Negro",
                value:"salmon-negro",
                "group":"Iris"
              },
              {
                name:"Naranja-Verde agua",
                value:"naranja-verde-agua",
                "group":"Iris"
              },
              
              {
                name:"Verde Manzana-Fuxia",
                value:"verde-manzana-fuxia",
                "group":"Iris"
              },
              
              {
                name:"Negro-Blanco",
                value:"negro-blanco",
                "group":"freest-hombre"
              },
              {
                name:"Gris-Azul oscuro",
                value:"gris-azul-oscuro",
                "group":"freest-hombre"
              },
              {
                name:"Azul-Verde Manzana",
                value:"azul-verde-manzana",
                "group":"freest-hombre"
              },
              {
                name:"Verde-AMarillo",
                value:"verde-amarillo",
                "group":"freest-hombre"
              },
              {
                name:"Fuxia-Verde Manzana",
                value:"fuxia-verde-manzana",
                "group":"freest-dama"
              },
              {
                name:"Salmon-Azul",
                value:"salmon-azul",
                "group":"freest-dama"
              },
              {
                name:"Beige-Rojo",
                value:"beige-rojo",
                "group":"freest-dama"
              },
              {
                name:"Azul Claro-Beige",
                value:"azul-claro-beige",
                "group":"freest-dama"
              },
              {
                name:"Verde Claro-Amarillo",
                value:"verde-claro-amarillo",
                "group":"freest-dama"
              },
              {
                name:"Negro",
                value:"negro",
                "group":"brenda corazon"//&& nohelia estampada
              },
              {
                name:"Fuxia",
                value:"fuxia",
                "group":"brenda corazon"//&& nohelia estampada
              },

              {
                name:"Azul",
                value:"azul",
                "group":"brenda corazon"//&& nohelia estampada
              },
              {
                name:"Azul Rey",
                value:"azul-rey",
                "group":"raid"//&& nohelia estampada
              },
              {
                name:"Canela",
                value:"canela",
              },
             
              
                ];
            }

            return {
                getColor: getColor
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
              },
              {
                name:'',
                value:''
              }
                ];
            }

            return {
                getSize: getSize
            }
        }
})();



angular.module('inventariomecanicos').filter('dateFilter',function(){
	return function datefilter(items, from, to) {
      var d= new Date();
      var t = d.valueOf();

       var result = [];
       ///console.log("fecha from en millis");
       //console.log(Date.parse(from));
       //console.log(from);
       angular.forEach(items, function(item){
           if (Date.parse(item.created) >= Date.parse(from) && Date.parse(to) >= Date.parse(item.created))  {
               result.push(item);
               //console.log("fecha en milisegundos");
               //console.log(Date.parse(item.created));
               //console.log("dato");
               //console.log(t);
            }
        });
        return result;
        };
}).filter('nameFilterMecanico',function(){
	return function namefilter(items,name) {
       var result = [];
       angular.forEach(items, function(item){
           if (item.name.match(name))  {///encontrar coincidencia con el cuado de busqueda del formulario
               result.push(item);
              // console.log("el item es ");
               //console.log(item.name);
            }
        });
        return result;
        };
})
angular.module('produccioncompanies').filter('dateFilter',function(){
	return function datefilter(items, from, to) {
     
       var result = [];
       ///console.log("fecha from en millis");
       //console.log(Date.parse(from));
       //console.log(from);
       angular.forEach(items, function(item){
           if (Date.parse(item.created) >= Date.parse(from) &&  Date.parse(item.created)<=Date.parse(to) )  {
               result.push(item);
            }
        });
        return result;
        };
}).filter('nameFilter',function(){
	return function namefilter(items,name) {

    if(name!=undefined ){
       var result = [];
       angular.forEach(items, function(item){
           if (item.tipo.match(name.value))  {///encontrar coincidencia con el cuado de busqueda del formulario
               result.push(item); 
            }
        });
        return result;
    }else{//retornamos el array completo
      return items
    }


  };
})
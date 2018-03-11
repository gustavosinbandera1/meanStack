var mongoose = require('mongoose'),
	errorHandler = require('../controllers/errors.server.controller'),
	_ = require('lodash');

function buscar_registro(modelData, Model, i) {
	//busca un registro determinado, por tipo,tipo_empaque,genero y fecha de creacion
	var prueba = modelData;
	return new Promise(function(fulfill, reject) {
		Model.find({
			'tipo': modelData.tipo,
			'genero': modelData.genero,
			'tamano': modelData.tamano
			//'created':modelData.created
		}, function(err, datos) {
			if (err) return reject(err);
			fulfill({
				dato1: datos,
				dato2: i
			});
		}); //Model.find
	});

};
/*
var guardarStock = function(stock,){
	//console.log("vamos a buscar por tamaño en despacho");
	//console.log(despachoproduccion);
}*/


var revisar_stock = function(stock, despachoproduccion) {

	//console.log("stock",stock1);
	///console.log("despacho", despachoproduccion);
	if (stock != undefined) {
		var cantidadParesStock = stock.cantidad_produccion;
		var cantidadParesDespacho = despachoproduccion.cantidad_docenas;

		if (cantidadParesStock >= cantidadParesDespacho) {
			//console.log("si hay stock: " + stock.tipo + "  genero: " + stock.genero + "  tamaño:  " + stock.tamano);
			return ({
				stock: stock,
				value: 1,
				tipo: despachoproduccion.tipo
			});

		} else {
			console.log("no hay stock suficiente");
			return ({
				stock: stock,
				value: -1,
				tipo: despachoproduccion.tipo
			});
		}
	} else {
		console.log("no hay stock");
		return ({
			stock: stock,
			value: -1,
			tipo: despachoproduccion.tipo
		});
	}
}


//datos representa el objeto stock que se desea modificar
//produccion representa el objecto que se desea despachar
//message representa el mensaje que el socjet emitira

function descontar_stock(stocks, despachoproduccion,today) {
	var cantidadDocenasStock,
		cantidadDocenasDespacho,
		cantParesStock,
		cantParesDespacho;

	return new Promise(function(fulfill, reject) {

		var distribucion = JSON.parse(despachoproduccion.cantidad_despacho);

		//console.log("los stocks del for:");
		//console.log(stocks);
		for (var j in stocks) {
			if (stocks.hasOwnProperty(j)) {
				//stocks[j].stock.cantidad_produccion * 100 / 100;
				cantidadDocenasStock = stocks[j].stock.cantidad_produccion;
				cantParesStock = cantidadDocenasStock * 12;


				for (var k in distribucion) {
					if (distribucion[k].tamano == stocks[j].stock.tamano) {
						var temp = {};
						//buscamos la distribucion que coincida con el registro del syock
						//para hacer las operaciones de descuentos necesarias
						//multiplicamos la cantidad de pares/docena por la cantidad de docenas a despachar
						//cantidad = cantiadd de pares por docena
						cantParesDespacho = distribucion[k].cantidad * despachoproduccion.cantidad_docenas;
						cantidadDocenasDespacho = (cantParesDespacho / 12);


						//reescribimos el stock
						cantParesStock = cantParesStock - cantParesDespacho;
						cantidadDocenasStock = (cantParesStock / 12);

						temp = stocks[j].stock;
						temp.cantidad_produccion = cantidadDocenasStock; //dato actualizado dspues de restar
						temp.created = today;
						stocks[j].stock = _.extend(stocks[j].stock, temp);

						//console.log("este es el nuevo stock", stocks[j].stock);
						stocks[j].stock.save(function(err) {
							if (err) {
								return reject(err);
							} else {
								//debemos almacenar el despacho en la tabla correspondiente
								//retornamos cuando se guarden todos los registros del stock
								//cuando j== numero de distribuciones - 1
								console.log("el registro se actualizo correctaente");
								if (j == stocks.length - 1) {
									fulfill(stocks);
								}
							}
						});


					}
				}


			}
		}
	});
};


exports.buscar_registro = buscar_registro;
exports.revisar_stock = revisar_stock;
exports.descontar_stock = descontar_stock;
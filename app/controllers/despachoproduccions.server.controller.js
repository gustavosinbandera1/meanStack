'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Despachoproduccion = mongoose.model('Despachoproduccion'),
	Customer = mongoose.model('Customer'),
	Produccionstock = mongoose.model('Produccionstock'),
	descontar = require('../services/despachoproduccions.server.service'),
	_ = require('lodash');


/**
 * Create a Despachoproduccion
 */

exports.create = function(req, res) {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10){ dd = '0'+dd } 
	if(mm<10){ mm = '0'+mm } 
	today = mm + '/' + dd + '/' + yyyy;


	var despachar = {};
	despachar.tipo = req.body.tipo;
	despachar.tipo_empaque = req.body.tipo_empaque;
	despachar.genero = req.body.genero;
	despachar.peso_produccion = req.body.peso_produccion;
	despachar.cantidad_despacho = JSON.stringify(req.body.distribucion); //cantidad de pares por talla 
	despachar.cliente = req.body.cliente; //cliente al que se va a despachar 
	despachar.cantidad_docenas = req.body.cantidad_produccion; //cantidad e docenas a despachar 
	despachar.transportadora = req.body.transportadora;

	var despachoproduccion = new Despachoproduccion(despachar);
	despachoproduccion.user = req.user;
	despachoproduccion.created = today;
	//cantidad_despacho contiene el objeto que me dice la distribucion por paquete
	var cantidad_despacho = JSON.parse(despachoproduccion.cantidad_despacho);
	var modelo = {};
	var availableStock = [];
	var temp = {};


	for (var i in cantidad_despacho) {
		if (cantidad_despacho.hasOwnProperty(i)) {
			modelo.tipo = cantidad_despacho[i].tipo;
			modelo.genero = cantidad_despacho[i].genero;
			modelo.tamano = cantidad_despacho[i].tamano;

			//console.log("available stock: ");
			temp = descontar.buscar_registro(modelo, Produccionstock, i).then(function(stock) {
				var indice = stock.dato2; //el valor de i en el momento de llamar la funcion
				var model = stock.dato3;
				var len = cantidad_despacho.length - 1;
				availableStock[indice] = descontar.revisar_stock(stock.dato1[0], despachoproduccion);
				//console.log("el stock: ", stock);
				switch (availableStock[indice].value) {
					case 0:
						//console.log("no hay stock suficiente");
						return temp;
						break;

					case 1:
						//console.log("si hay stock suficiente");
						if (indice >= len) {
							return availableStock;
						}
						break;

					case -1:
						//console.log("no se ha creado el stock");
						return -1;
						break;
				}


			});
		}
	}



	temp.then(function(stocks) {
		var canCreate = true;
		//console.log("hemos resuelto: ",stocks);
		if (stocks == -1) {
			//console.log("no se puede crear el despacho, falta stock", stocks);
			canCreate = false;
			//le respondemos al cliente
			console.log("no podemos crear dicha peticion");

		} else {
			//si entramos aqui es porque todo el despacho por lo menos ya esta regidtado
			//aunque no este completo, dicha informacion la evaluamos con la respuesta devuelta por el servicio
			//console.log("comprobando");
			for (var j in stocks) {
				if (stocks.hasOwnProperty(j)) {
					if (stocks[j].value == 0) {
						canCreate = false;
					} else {
						console.log("el stock esta completo");
					}
				}
			}

		}

		if (canCreate == true) {
			var status = false;
			//salvamos el despacho y actualizamos el stock
			//esta funcion retorna true si el stock se actualiza correctamente
			//de lo contrario retorna false
			descontar.descontar_stock(stocks, despachoproduccion,today).then(function(updatestocks) {
				//console.log("ya resolvimos: ", updatestocks);
				//debemos guardar la produccion y responder al cliente
				//al cliente le enviamos el stock actualizado y la produccion que se acabo de crear
				despachoproduccion.save(function(err) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
				        socketio.sockets.emit("despachoproduccion.created", despachoproduccion);
				      	socketio.sockets.emit("produccionstock.created", "");
				       res.jsonp(despachoproduccion);
						
					}
				});

			});
			//res.jsonp(stocks);
		}else{
			
			console.log("debemos reponder al cliente");
			return res.status(400).send({
							message: "no se puede crear el despacho stock insuficiente"
						});
		}
	});
};

/**
 * Show the current Despachoproduccion
 */
exports.read = function(req, res) {
	res.jsonp(req.despachoproduccion);
	console.log("-----------------------------------------");
	console.log("la respuesta despues de leer");
	console.log(req.despachoproduccion);
};

/**
 * Update a Despachoproduccion
 */
exports.update = function(req, res) {
	var despachoproduccion = req.despachoproduccion;

	despachoproduccion = _.extend(despachoproduccion, req.body);

	despachoproduccion.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(despachoproduccion);
		}
	});
};

/**
 * Delete an Despachoproduccion
 */
exports.delete = function(req, res) {
	var despachoproduccion = req.despachoproduccion;

	despachoproduccion.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(despachoproduccion);
		}
	});
};

/**
 * List of Despachoproduccions
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 5;
	var page = req.query.page || 1;


	var filter = {
		filters: {
			mandatory: {
				contains: req.query.filter
			}
		}
	};

	var pagination = {
		start: (page - 1) * count,
		count: count
	};

	if (req.query.sorting) {
		var sortKey = Object.keys(req.query.sorting)[0];
		var sortValue = req.query.sorting[sortKey];
		sortObject[sortValue] = sortKey;
	} else {
		sortObject.desc = '_id';
	}

	sort = {
		sort: sortObject
	};


	Despachoproduccion //el campo cliente del modelo despacho lo populamos con el campo name de customers
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, despachoproduccions) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(despachoproduccions);
				//console.log("esto es lo que se envia como respuesta",despachoproduccions);

			}
		});

};

/**
 * Despachoproduccion middleware
 */
exports.despachoproduccionByID = function(req, res, next, id) {
	Despachoproduccion.findById(id).populate('user', 'displayName')
		.populate('cliente')
		/*
			.populate('direccion','address')*/
		//.populate('ciudad','state')
		//.populate('telefono','tel')
		.exec(function(err, despachoproduccion) {
			if (err) return next(err);
			if (!despachoproduccion) return next(new Error('Failed to load Despachoproduccion ' + id));
			var obj = {};
			//console.log("despacho produccion antes de procesar", despachoproduccion);
			obj._id = despachoproduccion._id;
			obj.cliente = despachoproduccion.cliente._id;
			obj.clienteID = despachoproduccion.cliente.name;
			//obj.clienteID = despachoproduccion.cliente.name;
			obj.clienteCiudad = despachoproduccion.cliente.state;
			//obj.clienteTelefono = despachoproduccion.cliente.tel;
			//obj.clienteDireccion = despachoproduccion.cliente.address;
			obj.genero = despachoproduccion.genero;
			obj.peso_produccion = despachoproduccion.peso_produccion;
			obj.cantidad_produccion = despachoproduccion.cantidad_docenas;
			obj.tipo_empaque = despachoproduccion.tipo_empaque
			obj.tipo = despachoproduccion.tipo;
			obj.user = {
				'displayName': despachoproduccion.user.displayName,
				'_id': despachoproduccion.user._id
			};
			obj.transportadora = despachoproduccion.transportadora;

			//console.log(despachoproduccion.user.displayName);
			//console.log("obj despues", obj);

			req.despachoproduccion = obj;
			next();
		});
};

/**
 * Despachoproduccion authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.despachoproduccion.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Produccion = mongoose.model('Produccion'),
	ProduccionStock = mongoose.model('Produccionstock'),
	_ = require('lodash');

/**
 * Create a Produccion
 */


exports.create = function(req, res) {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	today = mm + '/' + dd + '/' + yyyy;

	var produccion = new Produccion(req.body);
	produccion.user = req.user;
	produccion.created = today;
	//creamos una instancia del modelo con datos
	var produccionstock = new ProduccionStock(produccion);

	//buscamos el registro produccion que se desea crear
	//dentro de la base de datos para saber si existe o
	//debemos crearlo, si ya existe debemos actualizar 
	//los datos de los contadores,
	//buscar registro recibe un parametro booleano que 
	//indica si la busqueda es con fecha o sin fecha
	buscar_registro(req, res, Produccion, produccion, 1).then(function(obj) {
		if (!obj.dato1.length) { //si no existe lo  creamos
			console.log("el registro no existe");
			guardar_registro(req, res, produccion, "produccion.created");
			//guardar_registro(req,res,produccionstock,"produccionstock.created");
			//res.jsonp(produccion);

		} else { //si existe lo actualizamos acumulando contadores
			//console.log("el registro existe");
			//console.log(obj.dato1[0]);
			acumular_produccion(req, res, obj.dato1[0], produccion, "produccion.created");
			//res.jsonp(produccion);
		}
	});

	//buscamos dicho registro en el stock sin tener en cuenta la 
	//fecha de creacion , debido a que necesitamos solo los 7
	//contadores


	buscar_registro(req, res, ProduccionStock, produccionstock, 0).then(function(obj) {
			if (!obj.dato1.length) { //si no existe lo  creamos
				console.log("el registro no existe", produccionstock);
				if (produccionstock.cantidad_produccion != null) {
					guardar_registro(req, res, produccionstock, "produccionstock.created");
					//guardar_registro(req,res,produccionstock,"produccionstock.created");
					console.log("terminando");
				}

		    } else { //si existe lo actualizamos acumulando contadores
			console.log("el registro existe");
			console.log(obj.dato1[0]);
			acumular_produccion(req, res, obj.dato1[0], produccion, "produccionstock.created");
			//res.jsonp(produccion);
		}
		res.jsonp(produccion);
	});


};



//esta funcion me permite acumular la produccion diaria 
//por fechas , lego debemos invocar
//datos representa el registro del stock, al que vamos a incrementar
var acumular_produccion = function(req, res, datos, produccion, message) {

	//console.log("el registro ya existe");
	//console.log(datos[0].cantidad_produccion);
	// console.log(datos);
	var temp = datos;
	//var temp = produccion;
	temp.cantidad_produccion = temp.cantidad_produccion + produccion.cantidad_produccion;
	temp.peso_produccion = temp.peso_produccion + produccion.peso_produccion;
	datos = _.extend(datos, temp); //dato[0] representa el objeto que se va a actualizar con los contadores de produccion
	console.log("estos son los datos extendidos");
	console.log(datos);
	datos.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			//console.log(datos);
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
			socketio.sockets.emit(message, produccion);
			console.log("enviamos evento socket: " + message);
		}
	});
};



/**
 * Show the current Produccion
 */
exports.read = function(req, res) {
	res.jsonp(req.produccion);
};

/**
 * Update a Produccion
 */
exports.update = function(req, res) {
	var produccion = req.produccion;

	produccion = _.extend(produccion, req.body);

	produccion.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container

			socketio.sockets.emit('produccion.updated', produccion);
			console.log("enviamos evento socket");
			res.jsonp(produccion);
		}
	});
};

/**
 * Delete an Produccion
 */
exports.delete = function(req, res) {
	var produccion = req.produccion;

	produccion.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('produccion.deleted', produccion);
			console.log("enviamos evento socket");
			res.jsonp(produccion);
		}
	});
};

/**
 * List of Produccions
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 1000;
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


	Produccion
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, produccions) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(produccions);
			}
		});

};

/**
 * Produccion middleware
 */
exports.produccionByID = function(req, res, next, id) {
	Produccion.findById(id).populate('user', 'displayName').exec(function(err, produccion) {
		if (err) return next(err);
		if (!produccion) return next(new Error('Error al cargar Produccion ' + id));
		req.produccion = produccion;
		next();
	});
};

/**
 * Produccion authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.produccion.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

//Model representa la tabla donde se va a realizar la busqueda
//modelData representa un objeto de datos para almacenar
function promiseSqrt(value) {
	console.log('START execution with value =', value);
	return new Promise(function(fulfill, reject) {
		setTimeout(function() {
			fulfill({
				value: value,
				result: value * value
			});
		}, 0 | Math.random() * 100);
	});
}

function buscar_registro(req, res, Model, modelData, boolDate) {
	//busca un registro determinado, por tipo,color,tamaño,genero y fecha de creacion
	//retorna true si se encuentra el registro, de lo
	//contrario retorna false
	if (boolDate) {
		return new Promise(function(fulfill, reject) {
			Model.find({
				'tipo': modelData.tipo,
				'tamano': modelData.tamano,
				'genero': modelData.genero,
				'created': modelData.created
			}, function(err, datos) {
				if (err) return handleError(err);
				fulfill({
					dato1: datos,
					dato2: modelData
				});
			}); //Produccion.find
		});
	} else {
		return new Promise(function(fulfill, reject) {
			Model.find({
				'tipo': modelData.tipo,
				'tamano': modelData.tamano,
				'genero': modelData.genero
			}, function(err, datos) {
				if (err) return handleError(err);
				//console.log("dentro de promise",datos);
				fulfill({
					dato1: datos,
					dato2: modelData
				});
				//fulfill(datos);
			}); //Produccion.find
		});
	}
};

var guardar_registro = function(req, res, modelData, message) {
	if (modelData != undefined) {
		modelData.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
				socketio.sockets.emit(message, modelData);
				console.log("enviamos evento socket: " + message);
				//res.jsonp(modelData);
				console.log("el registro se guardo correctamente");
			}
		});
	}
};



function promiseSqrt(value) {
	console.log('START execution with value =', value);
	return new Promise(function(fulfill, reject) {
		setTimeout(function() {
			fulfill({
				value: value,
				result: value * value
			});
		}, 0 | Math.random() * 100);
	});
}
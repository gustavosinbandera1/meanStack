'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Basculadeliverconfiguration = mongoose.model('Basculadeliverconfiguration'),
	_ = require('lodash');

/**
 * Create a Basculadeliverconfiguration
 */
exports.create = function(req, res) {

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var resp = {};
	resp.data= "el registro existe";

	if(dd<10){ dd = '0'+dd } 
	if(mm<10){ mm = '0'+mm } 
	today = mm + '/' + dd + '/' + yyyy;

	var basculadeliverconfiguration = new Basculadeliverconfiguration(req.body);
	basculadeliverconfiguration.user = req.user;
	basculadeliverconfiguration.created = today;
	//antes de crear la nueva configuracion debemos
	//verificar que no exista la configuracion que se desea crear

	buscar_registro(req,res,Basculadeliverconfiguration,basculadeliverconfiguration).then(function(obj){
		if(!obj.dato1.length){//si no existe lo  creamos
			console.log("el registro no existe");
			//console.log(basculadeliverconfiguration);
			guardar_registro(req,res,basculadeliverconfiguration,"basculadeliverconfiguration.created");
			//guardar_registro(req,res,produccionstock,"produccionstock.created");
			
			//res.jsonp(obj.dato1[0]);

		}else{//si existe lo actualizamos acumulando contadores
			console.log("el registro existe");
			
			//console.log(obj.dato1[0]);
			//res.jsonp();
			res.jsonp(resp);
		}
	});


	/*basculadeliverconfiguration.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(basculadeliverconfiguration);
		}
	});*/
};

/**
 * Show the current Basculadeliverconfiguration
 */
exports.read = function(req, res) {
	var cantidad = JSON.parse(req.basculadeliverconfiguration.cantidad_empaque);
	var temp = {};
	console.log("esta es ka cantidada");
	console.log(cantidad);
	temp.user = req.basculadeliverconfiguration.user;
	temp._id = req.basculadeliverconfiguration._id;
	temp.tipo = req.basculadeliverconfiguration.tipo;
	temp.tipo_empaque = req.basculadeliverconfiguration.tipo_empaque;
	temp.genero = req.basculadeliverconfiguration.genero;
	temp.peso_docena = req.basculadeliverconfiguration.peso_docena;
	temp.user = req.basculadeliverconfiguration.user;
	temp._id = req.basculadeliverconfiguration._id;
	temp.cantidad_23 = cantidad.cantidad_23;
	temp.cantidad_25 = cantidad.cantidad_25;
	temp.cantidad_27 = cantidad.cantidad_27;
	temp.cantidad_29 = cantidad.cantidad_29;
	temp.cantidad_31 = cantidad.cantidad_31;
	temp.cantidad_33 = cantidad.cantidad_33;
	temp.cantidad_35 = cantidad.cantidad_35;
	temp.cantidad_37 = cantidad.cantidad_37;
	temp.cantidad_39 = cantidad.cantidad_39;
	temp.cantidad_41 = cantidad.cantidad_41;
	temp.cantidad_43 = cantidad.cantidad_43;
	console.log("esto es lo que quieren ver");
	console.log(temp);
	res.jsonp(temp);
	/*console.log("esta es la cantidad");
	console.log(cantidad);*/
};

/**
 * Update a Basculadeliverconfiguration
 */
exports.update = function(req, res) {
	console.log("vamos a actulizar la bascula");
	var basculadeliverconfiguration = req.basculadeliverconfiguration ;

	basculadeliverconfiguration = _.extend(basculadeliverconfiguration , req.body);

	basculadeliverconfiguration.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(basculadeliverconfiguration);
		}
	});
};

/**
 * Delete an Basculadeliverconfiguration
 */
exports.delete = function(req, res) {
	console.log("estamos en la funcion de borrado");

	var basculadeliverconfiguration = req.basculadeliverconfiguration ;
	console.log(basculadeliverconfiguration);
	basculadeliverconfiguration.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(basculadeliverconfiguration);
			console.log("todo salio ok");
		}
	});
};

/**
 * List of Basculadeliverconfigurations
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 5;
	var page = req.query.page || 1;


	var filter = {
		filters : {
			mandatory : {
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
	}
	else {
		sortObject.desc = '_id';
	}

	sort = {
		sort: sortObject
	};


	Basculadeliverconfiguration
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, basculadeliverconfigurations){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(basculadeliverconfigurations);
			}
		});

};



function buscar_registro(req,res,Model,modelData){
	//busca un registro determinado, por tipo,tipo_empaque,genero y fecha de creacion
	
		return new Promise(function (fulfill, reject){
	        Model.find(
			{ 'tipo': modelData.tipo,
			'tipo_empaque': modelData.tipo_empaque,
			'genero': modelData.genero
			//'created':modelData.created
		    },function(err,datos){
			    	if (err) return handleError(err);
			         	fulfill({dato1:datos,dato2:modelData});
		   	});//Model.find
	    });
   
};

var guardar_registro = function(req,res,modelData,message){
	console.log("datos que se van a guardar");
	console.log(modelData);
	modelData.save(function(err){
				    if (err) {
					  return res.status(400).send({
				      message: errorHandler.getErrorMessage(err)
					  });
				    } else{
				         	var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
		                    socketio.sockets.emit(message, modelData);
					        console.log("enviamos evento socket: " + message);
				         	res.jsonp(modelData);
				         	console.log("el registro se guardo correctamente");
				         	}
			        });
};


/**
 * Basculadeliverconfiguration middleware
 */
exports.basculadeliverconfigurationByID = function(req, res, next, id) {
	console.log("vamos a editar los datos dela basculla");
	Basculadeliverconfiguration.findById(id).populate('user', 'displayName').exec(function(err, basculadeliverconfiguration) {
		if (err) return next(err);
		if (! basculadeliverconfiguration) return next(new Error('Failed to load Basculadeliverconfiguration ' + id));
		req.basculadeliverconfiguration = basculadeliverconfiguration ;
		next();
	});
};

/**
 * Basculadeliverconfiguration authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.basculadeliverconfiguration.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};





'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var Customer = mongoose.model('Customer');

/**
 * Despachoproduccion Schema
 */
var DespachoproduccionSchema = new Schema({
	tipo: {//tipo de produccion o producto
		type: String,//fomi-{corte-perforado-estampado-huellado},empacado,tiras ensamble,espanson-{herradura-bahia,boom,brisa,gato,cruzada},pvc{plantilla , chancla},TPL1-tiras
		default: '',
		required: 'Por favor ingrese el tipo de  produccion a despachar',
		trim: true
	},
	tipo_empaque: {
		type: String,
		default: '',
		required: 'Por favor ingrese el tipo de  empaque',
		trim: true
	},
	genero: {//niño,niña,hombre,dama
		type: String,
		default: '',
		trim: true
	},
	cantidad_despacho: {///json despacho por tallas en un total del bulto
		type: String,
		default: '',
		trim: true
	},
	cantidad_docenas: {
		type: Number,
		default: '',
		trim: true
	},
	peso_produccion: {//en kilogramos de una docena
		type: Number,
		default: '',
		trim: true
	},
	transportadora:{
		type: String,
		default: '',
		trim: true
	},
	
	cliente:{
		type: Schema.Types.ObjectId,
		ref: 'Customer'
	},
	/*direccion:{
		type: Schema.Types.ObjectId,
		ref: 'Customer'
	},*/
	ciudad:{
		type: Schema.Types.ObjectId,
		ref: 'Customer'
	},
	
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Despachoproduccion', DespachoproduccionSchema);
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Basculaconfiguration Schema
 */
var BasculadeliverconfigurationSchema = new Schema({
	tipo: {
		type: String,
		default: '',
		required: 'Por favor ingrese el tipo de produccion',
		trim: true
	},//nombre que le damos al empaque
	tipo_empaque: {
		type: String,
		default: '',
		required: 'Por favor ingrese el tipo de empaque'
	},
	peso_docena: {//peso de una docena 
		type: Number,
		default: '',
		trim: true
	},
	genero: {
		type: String,
		default: '',
		required: 'por favor ingrese el genero de la produccion',
		trim: true
	},
	//en este campo almacenamos un objeto en forma de 
	//string de la siguiente manera
	//con JSON.parse stringify() obtenemos el objeto
	/*
		{
			"cantidad29":"value29",
			"cantidad31": "value31",
			"cantidad33": "value33",
			"cantidad35": "value35",
			"cantidad37": "value37",
			"cantidad39": "value39",
			"cantidad41": "value41"
		}
	*/
	cantidad_empaque: {
		type: String,
		default:'',
		required:'por favor ingrese la cantidad',
		trim:true
	},
	updated: {
		type: Date,
		default: ''
	},
	created: {
		type: Date,
		default: ''
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Basculadeliverconfiguration', BasculadeliverconfigurationSchema);
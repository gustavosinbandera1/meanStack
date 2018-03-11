'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Basculaconfiguration Schema
 */
var BasculaconfigurationSchema = new Schema({
	tipo: {
		type: String,
		default: '',
		required: 'Por favor ingrese el tipo de produccion',
		trim: true
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
	tamano: {//numero de calzado 
		type: String,
		default: '',
		trim: true
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

mongoose.model('Basculaconfiguration', BasculaconfigurationSchema);
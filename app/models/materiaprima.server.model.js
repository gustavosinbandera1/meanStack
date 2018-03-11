'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Materiaprima Schema
 */
var MateriaprimaSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'por favor ingrese el nombre de la materia prima',
		trim: true
	},
	color: {
		type: String,
		default: '',
		required: 'Por favor ingrese el color',
		trim: true
	},
	tipo: {
		type: String,
		default: '',
		required: 'Por favor ingrese el tipo de material',
		trim: true
	},
	cantidad: {
		type: Number,
		default: '',
		required: 'Por favor ingrese la cantidad',
		trim: true
	},
	updated: {
        type: Date,
        default: ""
    },
	created: {
		type: Date,
		default: ""
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Materiaprima', MateriaprimaSchema);
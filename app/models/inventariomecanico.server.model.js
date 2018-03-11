'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Inventariomecanico Schema
 */
var InventariomecanicoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'por favor ingrese el nombre de la parte',
		trim: true
	},
	cantidad: {
		type: Number,
		default: '',
		required: 'Por favor ingrese la cantidad en existencia',
		trim: true
	},
	descripcion: {
		type: String,
		default: '',
		required: 'Por favor ingrese una descripcion para la parte',
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

mongoose.model('Inventariomecanico', InventariomecanicoSchema);
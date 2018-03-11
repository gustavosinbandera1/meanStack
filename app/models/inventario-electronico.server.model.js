'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Inventario electronico Schema
 */
var InventarioElectronicoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Por favor ingrese el nombre del producto o parte',
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
		required: 'Por favor ingrese una descripcion para el producto o parte',
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

mongoose.model('InventarioElectronico', InventarioElectronicoSchema);
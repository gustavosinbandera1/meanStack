'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Mantenimiento Schema
 */
var MantenimientoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Mantenimiento name',
		trim: true
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

mongoose.model('Mantenimiento', MantenimientoSchema);
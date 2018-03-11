'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Customer name',
		trim: true
	},
    /*apellido: {
        type: String,
        default: '',
        required: 'Please fill Customer apellido',
        trim: true
    },
	address: {
    type: String,
    default: '',
    required: 'Please fill Customer address',
    trim: true
    },
    tel: {
    type: String,
    default: '',
    required: 'Please fill Customer state',
    trim: true
    },*/
    state: {
    type: String,
    default: '',
    required: 'ingrese la ciudad',
    trim: true
  },
    updated: {
        type: Date,
        default: ''
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

mongoose.model('Customer', CustomerSchema);
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Produccioncompany Schema
 */
var ProduccioncompanySchema = new Schema({
	tipo: {//tipo de calzado
		type: String,
		default: '',
		required: 'Por favor ingrese el tipo de  produccion',
		trim: true
	},
	cantidad_produccion: {//cantidad en docenas
		type: Number,
		default: '',
		trim: true
	},
	peso_produccion: {//en kilogramos
		type: Number,
		default: '',
		trim: true
	},
	
	genero: {//niño,niña,hombre,dama
		type: String,
		default: '',
		trim: true
	},
	tamano: {//numero de calzado 
		type: String,
		default: '',
		trim: true
	},
			
	created: {
		type: Date,
		default: ''
	},
	user: {//usuario que creo la entrada 
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Produccioncompany', ProduccioncompanySchema);
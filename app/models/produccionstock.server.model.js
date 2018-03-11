'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Produccionstock Schema
 */
var ProduccionstockSchema = new Schema({
	tipo: {
		type: String,//fomi-{corte-perforado-estampado-huellado},empacado,tiras ensamble,espanson-{herradura-bahia,boom,brisa,gato,cruzada},pvc{plantilla , chancla},TPL1-tiras
		default: '',
		required: 'Por favor ingrese el tipo de  produccion',
		trim: true
	},
	cantidad_produccion: {//acumulador de stock
		type: Number,
		default: '',
		trim: true
	},
	peso_produccion: {//acumulador de stock
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
	updated: {
		type: Date,
		default:''
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

mongoose.model('Produccionstock', ProduccionstockSchema);
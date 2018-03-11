'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Despachoproduccion = mongoose.model('Despachoproduccion');

/**
 * Globals
 */
var user, despachoproduccion;

/**
 * Unit tests
 */
describe('Despachoproduccion Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			despachoproduccion = new Despachoproduccion({
				name: 'Despachoproduccion Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return despachoproduccion.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			despachoproduccion.name = '';

			return despachoproduccion.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Despachoproduccion.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});

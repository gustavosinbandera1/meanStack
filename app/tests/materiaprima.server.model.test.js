'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Materiaprima = mongoose.model('Materiaprima');

/**
 * Globals
 */
var user, materiaprima;

/**
 * Unit tests
 */
describe('Materiaprima Model Unit Tests:', function() {
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
			materiaprima = new Materiaprima({
				name: 'Materiaprima Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return materiaprima.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			materiaprima.name = '';

			return materiaprima.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Materiaprima.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});

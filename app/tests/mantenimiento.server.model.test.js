'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mantenimiento = mongoose.model('Mantenimiento');

/**
 * Globals
 */
var user, mantenimiento;

/**
 * Unit tests
 */
describe('Mantenimiento Model Unit Tests:', function() {
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
			mantenimiento = new Mantenimiento({
				name: 'Mantenimiento Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return mantenimiento.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			mantenimiento.name = '';

			return mantenimiento.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Mantenimiento.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});

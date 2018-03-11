'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Inventariomecanico = mongoose.model('Inventariomecanico');

/**
 * Globals
 */
var user, inventariomecanico;

/**
 * Unit tests
 */
describe('Inventariomecanico Model Unit Tests:', function() {
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
			inventariomecanico = new Inventariomecanico({
				name: 'Inventariomecanico Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return inventariomecanico.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			inventariomecanico.name = '';

			return inventariomecanico.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Inventariomecanico.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});

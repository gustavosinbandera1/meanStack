'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Basculaconfiguration = mongoose.model('Basculaconfiguration');

/**
 * Globals
 */
var user, basculaconfiguration;

/**
 * Unit tests
 */
describe('Basculaconfiguration Model Unit Tests:', function() {
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
			basculaconfiguration = new Basculaconfiguration({
				name: 'Basculaconfiguration Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return basculaconfiguration.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			basculaconfiguration.name = '';

			return basculaconfiguration.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Basculaconfiguration.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});

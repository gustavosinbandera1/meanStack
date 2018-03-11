'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Materiaprima = mongoose.model('Materiaprima'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, materiaprima;

/**
 * Materiaprima routes tests
 */
describe('Materiaprima CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Materiaprima
		user.save(function() {
			materiaprima = {
				name: 'Materiaprima Name'
			};

			done();
		});
	});

	it('should be able to save Materiaprima instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Materiaprima
				agent.post('/materiaprimas')
					.send(materiaprima)
					.expect(200)
					.end(function(materiaprimaSaveErr, materiaprimaSaveRes) {
						// Handle Materiaprima save error
						if (materiaprimaSaveErr) done(materiaprimaSaveErr);

						// Get a list of Materiaprimas
						agent.get('/materiaprimas')
							.end(function(materiaprimasGetErr, materiaprimasGetRes) {
								// Handle Materiaprima save error
								if (materiaprimasGetErr) done(materiaprimasGetErr);

								// Get Materiaprimas list
								var materiaprimas = materiaprimasGetRes.body;

								// Set assertions
								(materiaprimas[0].user._id).should.equal(userId);
								(materiaprimas[0].name).should.match('Materiaprima Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Materiaprima instance if not logged in', function(done) {
		agent.post('/materiaprimas')
			.send(materiaprima)
			.expect(401)
			.end(function(materiaprimaSaveErr, materiaprimaSaveRes) {
				// Call the assertion callback
				done(materiaprimaSaveErr);
			});
	});

	it('should not be able to save Materiaprima instance if no name is provided', function(done) {
		// Invalidate name field
		materiaprima.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Materiaprima
				agent.post('/materiaprimas')
					.send(materiaprima)
					.expect(400)
					.end(function(materiaprimaSaveErr, materiaprimaSaveRes) {
						// Set message assertion
						(materiaprimaSaveRes.body.message).should.match('Please fill Materiaprima name');
						
						// Handle Materiaprima save error
						done(materiaprimaSaveErr);
					});
			});
	});

	it('should be able to update Materiaprima instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Materiaprima
				agent.post('/materiaprimas')
					.send(materiaprima)
					.expect(200)
					.end(function(materiaprimaSaveErr, materiaprimaSaveRes) {
						// Handle Materiaprima save error
						if (materiaprimaSaveErr) done(materiaprimaSaveErr);

						// Update Materiaprima name
						materiaprima.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Materiaprima
						agent.put('/materiaprimas/' + materiaprimaSaveRes.body._id)
							.send(materiaprima)
							.expect(200)
							.end(function(materiaprimaUpdateErr, materiaprimaUpdateRes) {
								// Handle Materiaprima update error
								if (materiaprimaUpdateErr) done(materiaprimaUpdateErr);

								// Set assertions
								(materiaprimaUpdateRes.body._id).should.equal(materiaprimaSaveRes.body._id);
								(materiaprimaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Materiaprimas if not signed in', function(done) {
		// Create new Materiaprima model instance
		var materiaprimaObj = new Materiaprima(materiaprima);

		// Save the Materiaprima
		materiaprimaObj.save(function() {
			// Request Materiaprimas
			request(app).get('/materiaprimas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Materiaprima if not signed in', function(done) {
		// Create new Materiaprima model instance
		var materiaprimaObj = new Materiaprima(materiaprima);

		// Save the Materiaprima
		materiaprimaObj.save(function() {
			request(app).get('/materiaprimas/' + materiaprimaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', materiaprima.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Materiaprima instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Materiaprima
				agent.post('/materiaprimas')
					.send(materiaprima)
					.expect(200)
					.end(function(materiaprimaSaveErr, materiaprimaSaveRes) {
						// Handle Materiaprima save error
						if (materiaprimaSaveErr) done(materiaprimaSaveErr);

						// Delete existing Materiaprima
						agent.delete('/materiaprimas/' + materiaprimaSaveRes.body._id)
							.send(materiaprima)
							.expect(200)
							.end(function(materiaprimaDeleteErr, materiaprimaDeleteRes) {
								// Handle Materiaprima error error
								if (materiaprimaDeleteErr) done(materiaprimaDeleteErr);

								// Set assertions
								(materiaprimaDeleteRes.body._id).should.equal(materiaprimaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Materiaprima instance if not signed in', function(done) {
		// Set Materiaprima user 
		materiaprima.user = user;

		// Create new Materiaprima model instance
		var materiaprimaObj = new Materiaprima(materiaprima);

		// Save the Materiaprima
		materiaprimaObj.save(function() {
			// Try deleting Materiaprima
			request(app).delete('/materiaprimas/' + materiaprimaObj._id)
			.expect(401)
			.end(function(materiaprimaDeleteErr, materiaprimaDeleteRes) {
				// Set message assertion
				(materiaprimaDeleteRes.body.message).should.match('User is not logged in');

				// Handle Materiaprima error error
				done(materiaprimaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Materiaprima.remove().exec(function(){
				done();
			});	
		});
	});
});

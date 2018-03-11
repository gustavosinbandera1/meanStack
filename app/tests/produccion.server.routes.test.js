'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Produccion = mongoose.model('Produccion'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, produccion;

/**
 * Produccion routes tests
 */
describe('Produccion CRUD tests', function() {
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

		// Save a user to the test db and create new Produccion
		user.save(function() {
			produccion = {
				name: 'Produccion Name'
			};

			done();
		});
	});

	it('should be able to save Produccion instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccion
				agent.post('/produccions')
					.send(produccion)
					.expect(200)
					.end(function(produccionSaveErr, produccionSaveRes) {
						// Handle Produccion save error
						if (produccionSaveErr) done(produccionSaveErr);

						// Get a list of Produccions
						agent.get('/produccions')
							.end(function(produccionsGetErr, produccionsGetRes) {
								// Handle Produccion save error
								if (produccionsGetErr) done(produccionsGetErr);

								// Get Produccions list
								var produccions = produccionsGetRes.body;

								// Set assertions
								(produccions[0].user._id).should.equal(userId);
								(produccions[0].name).should.match('Produccion Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Produccion instance if not logged in', function(done) {
		agent.post('/produccions')
			.send(produccion)
			.expect(401)
			.end(function(produccionSaveErr, produccionSaveRes) {
				// Call the assertion callback
				done(produccionSaveErr);
			});
	});

	it('should not be able to save Produccion instance if no name is provided', function(done) {
		// Invalidate name field
		produccion.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccion
				agent.post('/produccions')
					.send(produccion)
					.expect(400)
					.end(function(produccionSaveErr, produccionSaveRes) {
						// Set message assertion
						(produccionSaveRes.body.message).should.match('Please fill Produccion name');
						
						// Handle Produccion save error
						done(produccionSaveErr);
					});
			});
	});

	it('should be able to update Produccion instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccion
				agent.post('/produccions')
					.send(produccion)
					.expect(200)
					.end(function(produccionSaveErr, produccionSaveRes) {
						// Handle Produccion save error
						if (produccionSaveErr) done(produccionSaveErr);

						// Update Produccion name
						produccion.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Produccion
						agent.put('/produccions/' + produccionSaveRes.body._id)
							.send(produccion)
							.expect(200)
							.end(function(produccionUpdateErr, produccionUpdateRes) {
								// Handle Produccion update error
								if (produccionUpdateErr) done(produccionUpdateErr);

								// Set assertions
								(produccionUpdateRes.body._id).should.equal(produccionSaveRes.body._id);
								(produccionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Produccions if not signed in', function(done) {
		// Create new Produccion model instance
		var produccionObj = new Produccion(produccion);

		// Save the Produccion
		produccionObj.save(function() {
			// Request Produccions
			request(app).get('/produccions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Produccion if not signed in', function(done) {
		// Create new Produccion model instance
		var produccionObj = new Produccion(produccion);

		// Save the Produccion
		produccionObj.save(function() {
			request(app).get('/produccions/' + produccionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', produccion.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Produccion instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccion
				agent.post('/produccions')
					.send(produccion)
					.expect(200)
					.end(function(produccionSaveErr, produccionSaveRes) {
						// Handle Produccion save error
						if (produccionSaveErr) done(produccionSaveErr);

						// Delete existing Produccion
						agent.delete('/produccions/' + produccionSaveRes.body._id)
							.send(produccion)
							.expect(200)
							.end(function(produccionDeleteErr, produccionDeleteRes) {
								// Handle Produccion error error
								if (produccionDeleteErr) done(produccionDeleteErr);

								// Set assertions
								(produccionDeleteRes.body._id).should.equal(produccionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Produccion instance if not signed in', function(done) {
		// Set Produccion user 
		produccion.user = user;

		// Create new Produccion model instance
		var produccionObj = new Produccion(produccion);

		// Save the Produccion
		produccionObj.save(function() {
			// Try deleting Produccion
			request(app).delete('/produccions/' + produccionObj._id)
			.expect(401)
			.end(function(produccionDeleteErr, produccionDeleteRes) {
				// Set message assertion
				(produccionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Produccion error error
				done(produccionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Produccion.remove().exec(function(){
				done();
			});	
		});
	});
});

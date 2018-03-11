'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Despachoproduccion = mongoose.model('Despachoproduccion'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, despachoproduccion;

/**
 * Despachoproduccion routes tests
 */
describe('Despachoproduccion CRUD tests', function() {
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

		// Save a user to the test db and create new Despachoproduccion
		user.save(function() {
			despachoproduccion = {
				name: 'Despachoproduccion Name'
			};

			done();
		});
	});

	it('should be able to save Despachoproduccion instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Despachoproduccion
				agent.post('/despachoproduccions')
					.send(despachoproduccion)
					.expect(200)
					.end(function(despachoproduccionSaveErr, despachoproduccionSaveRes) {
						// Handle Despachoproduccion save error
						if (despachoproduccionSaveErr) done(despachoproduccionSaveErr);

						// Get a list of Despachoproduccions
						agent.get('/despachoproduccions')
							.end(function(despachoproduccionsGetErr, despachoproduccionsGetRes) {
								// Handle Despachoproduccion save error
								if (despachoproduccionsGetErr) done(despachoproduccionsGetErr);

								// Get Despachoproduccions list
								var despachoproduccions = despachoproduccionsGetRes.body;

								// Set assertions
								(despachoproduccions[0].user._id).should.equal(userId);
								(despachoproduccions[0].name).should.match('Despachoproduccion Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Despachoproduccion instance if not logged in', function(done) {
		agent.post('/despachoproduccions')
			.send(despachoproduccion)
			.expect(401)
			.end(function(despachoproduccionSaveErr, despachoproduccionSaveRes) {
				// Call the assertion callback
				done(despachoproduccionSaveErr);
			});
	});

	it('should not be able to save Despachoproduccion instance if no name is provided', function(done) {
		// Invalidate name field
		despachoproduccion.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Despachoproduccion
				agent.post('/despachoproduccions')
					.send(despachoproduccion)
					.expect(400)
					.end(function(despachoproduccionSaveErr, despachoproduccionSaveRes) {
						// Set message assertion
						(despachoproduccionSaveRes.body.message).should.match('Please fill Despachoproduccion name');
						
						// Handle Despachoproduccion save error
						done(despachoproduccionSaveErr);
					});
			});
	});

	it('should be able to update Despachoproduccion instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Despachoproduccion
				agent.post('/despachoproduccions')
					.send(despachoproduccion)
					.expect(200)
					.end(function(despachoproduccionSaveErr, despachoproduccionSaveRes) {
						// Handle Despachoproduccion save error
						if (despachoproduccionSaveErr) done(despachoproduccionSaveErr);

						// Update Despachoproduccion name
						despachoproduccion.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Despachoproduccion
						agent.put('/despachoproduccions/' + despachoproduccionSaveRes.body._id)
							.send(despachoproduccion)
							.expect(200)
							.end(function(despachoproduccionUpdateErr, despachoproduccionUpdateRes) {
								// Handle Despachoproduccion update error
								if (despachoproduccionUpdateErr) done(despachoproduccionUpdateErr);

								// Set assertions
								(despachoproduccionUpdateRes.body._id).should.equal(despachoproduccionSaveRes.body._id);
								(despachoproduccionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Despachoproduccions if not signed in', function(done) {
		// Create new Despachoproduccion model instance
		var despachoproduccionObj = new Despachoproduccion(despachoproduccion);

		// Save the Despachoproduccion
		despachoproduccionObj.save(function() {
			// Request Despachoproduccions
			request(app).get('/despachoproduccions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Despachoproduccion if not signed in', function(done) {
		// Create new Despachoproduccion model instance
		var despachoproduccionObj = new Despachoproduccion(despachoproduccion);

		// Save the Despachoproduccion
		despachoproduccionObj.save(function() {
			request(app).get('/despachoproduccions/' + despachoproduccionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', despachoproduccion.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Despachoproduccion instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Despachoproduccion
				agent.post('/despachoproduccions')
					.send(despachoproduccion)
					.expect(200)
					.end(function(despachoproduccionSaveErr, despachoproduccionSaveRes) {
						// Handle Despachoproduccion save error
						if (despachoproduccionSaveErr) done(despachoproduccionSaveErr);

						// Delete existing Despachoproduccion
						agent.delete('/despachoproduccions/' + despachoproduccionSaveRes.body._id)
							.send(despachoproduccion)
							.expect(200)
							.end(function(despachoproduccionDeleteErr, despachoproduccionDeleteRes) {
								// Handle Despachoproduccion error error
								if (despachoproduccionDeleteErr) done(despachoproduccionDeleteErr);

								// Set assertions
								(despachoproduccionDeleteRes.body._id).should.equal(despachoproduccionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Despachoproduccion instance if not signed in', function(done) {
		// Set Despachoproduccion user 
		despachoproduccion.user = user;

		// Create new Despachoproduccion model instance
		var despachoproduccionObj = new Despachoproduccion(despachoproduccion);

		// Save the Despachoproduccion
		despachoproduccionObj.save(function() {
			// Try deleting Despachoproduccion
			request(app).delete('/despachoproduccions/' + despachoproduccionObj._id)
			.expect(401)
			.end(function(despachoproduccionDeleteErr, despachoproduccionDeleteRes) {
				// Set message assertion
				(despachoproduccionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Despachoproduccion error error
				done(despachoproduccionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Despachoproduccion.remove().exec(function(){
				done();
			});	
		});
	});
});

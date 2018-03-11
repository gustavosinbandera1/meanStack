'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ConfigurarDespacho = mongoose.model('ConfigurarDespacho'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, configurarDespacho;

/**
 * Configurar despacho routes tests
 */
describe('Configurar despacho CRUD tests', function() {
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

		// Save a user to the test db and create new Configurar despacho
		user.save(function() {
			configurarDespacho = {
				name: 'Configurar despacho Name'
			};

			done();
		});
	});

	it('should be able to save Configurar despacho instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Configurar despacho
				agent.post('/configurar-despachos')
					.send(configurarDespacho)
					.expect(200)
					.end(function(configurarDespachoSaveErr, configurarDespachoSaveRes) {
						// Handle Configurar despacho save error
						if (configurarDespachoSaveErr) done(configurarDespachoSaveErr);

						// Get a list of Configurar despachos
						agent.get('/configurar-despachos')
							.end(function(configurarDespachosGetErr, configurarDespachosGetRes) {
								// Handle Configurar despacho save error
								if (configurarDespachosGetErr) done(configurarDespachosGetErr);

								// Get Configurar despachos list
								var configurarDespachos = configurarDespachosGetRes.body;

								// Set assertions
								(configurarDespachos[0].user._id).should.equal(userId);
								(configurarDespachos[0].name).should.match('Configurar despacho Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Configurar despacho instance if not logged in', function(done) {
		agent.post('/configurar-despachos')
			.send(configurarDespacho)
			.expect(401)
			.end(function(configurarDespachoSaveErr, configurarDespachoSaveRes) {
				// Call the assertion callback
				done(configurarDespachoSaveErr);
			});
	});

	it('should not be able to save Configurar despacho instance if no name is provided', function(done) {
		// Invalidate name field
		configurarDespacho.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Configurar despacho
				agent.post('/configurar-despachos')
					.send(configurarDespacho)
					.expect(400)
					.end(function(configurarDespachoSaveErr, configurarDespachoSaveRes) {
						// Set message assertion
						(configurarDespachoSaveRes.body.message).should.match('Please fill Configurar despacho name');
						
						// Handle Configurar despacho save error
						done(configurarDespachoSaveErr);
					});
			});
	});

	it('should be able to update Configurar despacho instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Configurar despacho
				agent.post('/configurar-despachos')
					.send(configurarDespacho)
					.expect(200)
					.end(function(configurarDespachoSaveErr, configurarDespachoSaveRes) {
						// Handle Configurar despacho save error
						if (configurarDespachoSaveErr) done(configurarDespachoSaveErr);

						// Update Configurar despacho name
						configurarDespacho.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Configurar despacho
						agent.put('/configurar-despachos/' + configurarDespachoSaveRes.body._id)
							.send(configurarDespacho)
							.expect(200)
							.end(function(configurarDespachoUpdateErr, configurarDespachoUpdateRes) {
								// Handle Configurar despacho update error
								if (configurarDespachoUpdateErr) done(configurarDespachoUpdateErr);

								// Set assertions
								(configurarDespachoUpdateRes.body._id).should.equal(configurarDespachoSaveRes.body._id);
								(configurarDespachoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Configurar despachos if not signed in', function(done) {
		// Create new Configurar despacho model instance
		var configurarDespachoObj = new ConfigurarDespacho(configurarDespacho);

		// Save the Configurar despacho
		configurarDespachoObj.save(function() {
			// Request Configurar despachos
			request(app).get('/configurar-despachos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Configurar despacho if not signed in', function(done) {
		// Create new Configurar despacho model instance
		var configurarDespachoObj = new ConfigurarDespacho(configurarDespacho);

		// Save the Configurar despacho
		configurarDespachoObj.save(function() {
			request(app).get('/configurar-despachos/' + configurarDespachoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', configurarDespacho.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Configurar despacho instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Configurar despacho
				agent.post('/configurar-despachos')
					.send(configurarDespacho)
					.expect(200)
					.end(function(configurarDespachoSaveErr, configurarDespachoSaveRes) {
						// Handle Configurar despacho save error
						if (configurarDespachoSaveErr) done(configurarDespachoSaveErr);

						// Delete existing Configurar despacho
						agent.delete('/configurar-despachos/' + configurarDespachoSaveRes.body._id)
							.send(configurarDespacho)
							.expect(200)
							.end(function(configurarDespachoDeleteErr, configurarDespachoDeleteRes) {
								// Handle Configurar despacho error error
								if (configurarDespachoDeleteErr) done(configurarDespachoDeleteErr);

								// Set assertions
								(configurarDespachoDeleteRes.body._id).should.equal(configurarDespachoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Configurar despacho instance if not signed in', function(done) {
		// Set Configurar despacho user 
		configurarDespacho.user = user;

		// Create new Configurar despacho model instance
		var configurarDespachoObj = new ConfigurarDespacho(configurarDespacho);

		// Save the Configurar despacho
		configurarDespachoObj.save(function() {
			// Try deleting Configurar despacho
			request(app).delete('/configurar-despachos/' + configurarDespachoObj._id)
			.expect(401)
			.end(function(configurarDespachoDeleteErr, configurarDespachoDeleteRes) {
				// Set message assertion
				(configurarDespachoDeleteRes.body.message).should.match('User is not logged in');

				// Handle Configurar despacho error error
				done(configurarDespachoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			ConfigurarDespacho.remove().exec(function(){
				done();
			});	
		});
	});
});

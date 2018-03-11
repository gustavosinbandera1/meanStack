'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mantenimiento = mongoose.model('Mantenimiento'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, mantenimiento;

/**
 * Mantenimiento routes tests
 */
describe('Mantenimiento CRUD tests', function() {
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

		// Save a user to the test db and create new Mantenimiento
		user.save(function() {
			mantenimiento = {
				name: 'Mantenimiento Name'
			};

			done();
		});
	});

	it('should be able to save Mantenimiento instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mantenimiento
				agent.post('/mantenimientos')
					.send(mantenimiento)
					.expect(200)
					.end(function(mantenimientoSaveErr, mantenimientoSaveRes) {
						// Handle Mantenimiento save error
						if (mantenimientoSaveErr) done(mantenimientoSaveErr);

						// Get a list of Mantenimientos
						agent.get('/mantenimientos')
							.end(function(mantenimientosGetErr, mantenimientosGetRes) {
								// Handle Mantenimiento save error
								if (mantenimientosGetErr) done(mantenimientosGetErr);

								// Get Mantenimientos list
								var mantenimientos = mantenimientosGetRes.body;

								// Set assertions
								(mantenimientos[0].user._id).should.equal(userId);
								(mantenimientos[0].name).should.match('Mantenimiento Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Mantenimiento instance if not logged in', function(done) {
		agent.post('/mantenimientos')
			.send(mantenimiento)
			.expect(401)
			.end(function(mantenimientoSaveErr, mantenimientoSaveRes) {
				// Call the assertion callback
				done(mantenimientoSaveErr);
			});
	});

	it('should not be able to save Mantenimiento instance if no name is provided', function(done) {
		// Invalidate name field
		mantenimiento.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mantenimiento
				agent.post('/mantenimientos')
					.send(mantenimiento)
					.expect(400)
					.end(function(mantenimientoSaveErr, mantenimientoSaveRes) {
						// Set message assertion
						(mantenimientoSaveRes.body.message).should.match('Please fill Mantenimiento name');
						
						// Handle Mantenimiento save error
						done(mantenimientoSaveErr);
					});
			});
	});

	it('should be able to update Mantenimiento instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mantenimiento
				agent.post('/mantenimientos')
					.send(mantenimiento)
					.expect(200)
					.end(function(mantenimientoSaveErr, mantenimientoSaveRes) {
						// Handle Mantenimiento save error
						if (mantenimientoSaveErr) done(mantenimientoSaveErr);

						// Update Mantenimiento name
						mantenimiento.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Mantenimiento
						agent.put('/mantenimientos/' + mantenimientoSaveRes.body._id)
							.send(mantenimiento)
							.expect(200)
							.end(function(mantenimientoUpdateErr, mantenimientoUpdateRes) {
								// Handle Mantenimiento update error
								if (mantenimientoUpdateErr) done(mantenimientoUpdateErr);

								// Set assertions
								(mantenimientoUpdateRes.body._id).should.equal(mantenimientoSaveRes.body._id);
								(mantenimientoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Mantenimientos if not signed in', function(done) {
		// Create new Mantenimiento model instance
		var mantenimientoObj = new Mantenimiento(mantenimiento);

		// Save the Mantenimiento
		mantenimientoObj.save(function() {
			// Request Mantenimientos
			request(app).get('/mantenimientos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Mantenimiento if not signed in', function(done) {
		// Create new Mantenimiento model instance
		var mantenimientoObj = new Mantenimiento(mantenimiento);

		// Save the Mantenimiento
		mantenimientoObj.save(function() {
			request(app).get('/mantenimientos/' + mantenimientoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', mantenimiento.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Mantenimiento instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mantenimiento
				agent.post('/mantenimientos')
					.send(mantenimiento)
					.expect(200)
					.end(function(mantenimientoSaveErr, mantenimientoSaveRes) {
						// Handle Mantenimiento save error
						if (mantenimientoSaveErr) done(mantenimientoSaveErr);

						// Delete existing Mantenimiento
						agent.delete('/mantenimientos/' + mantenimientoSaveRes.body._id)
							.send(mantenimiento)
							.expect(200)
							.end(function(mantenimientoDeleteErr, mantenimientoDeleteRes) {
								// Handle Mantenimiento error error
								if (mantenimientoDeleteErr) done(mantenimientoDeleteErr);

								// Set assertions
								(mantenimientoDeleteRes.body._id).should.equal(mantenimientoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Mantenimiento instance if not signed in', function(done) {
		// Set Mantenimiento user 
		mantenimiento.user = user;

		// Create new Mantenimiento model instance
		var mantenimientoObj = new Mantenimiento(mantenimiento);

		// Save the Mantenimiento
		mantenimientoObj.save(function() {
			// Try deleting Mantenimiento
			request(app).delete('/mantenimientos/' + mantenimientoObj._id)
			.expect(401)
			.end(function(mantenimientoDeleteErr, mantenimientoDeleteRes) {
				// Set message assertion
				(mantenimientoDeleteRes.body.message).should.match('User is not logged in');

				// Handle Mantenimiento error error
				done(mantenimientoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Mantenimiento.remove().exec(function(){
				done();
			});	
		});
	});
});

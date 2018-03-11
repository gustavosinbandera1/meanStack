'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Inventariomecanico = mongoose.model('Inventariomecanico'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, inventariomecanico;

/**
 * Inventariomecanico routes tests
 */
describe('Inventariomecanico CRUD tests', function() {
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

		// Save a user to the test db and create new Inventariomecanico
		user.save(function() {
			inventariomecanico = {
				name: 'Inventariomecanico Name'
			};

			done();
		});
	});

	it('should be able to save Inventariomecanico instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inventariomecanico
				agent.post('/inventariomecanicos')
					.send(inventariomecanico)
					.expect(200)
					.end(function(inventariomecanicoSaveErr, inventariomecanicoSaveRes) {
						// Handle Inventariomecanico save error
						if (inventariomecanicoSaveErr) done(inventariomecanicoSaveErr);

						// Get a list of Inventariomecanicos
						agent.get('/inventariomecanicos')
							.end(function(inventariomecanicosGetErr, inventariomecanicosGetRes) {
								// Handle Inventariomecanico save error
								if (inventariomecanicosGetErr) done(inventariomecanicosGetErr);

								// Get Inventariomecanicos list
								var inventariomecanicos = inventariomecanicosGetRes.body;

								// Set assertions
								(inventariomecanicos[0].user._id).should.equal(userId);
								(inventariomecanicos[0].name).should.match('Inventariomecanico Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Inventariomecanico instance if not logged in', function(done) {
		agent.post('/inventariomecanicos')
			.send(inventariomecanico)
			.expect(401)
			.end(function(inventariomecanicoSaveErr, inventariomecanicoSaveRes) {
				// Call the assertion callback
				done(inventariomecanicoSaveErr);
			});
	});

	it('should not be able to save Inventariomecanico instance if no name is provided', function(done) {
		// Invalidate name field
		inventariomecanico.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inventariomecanico
				agent.post('/inventariomecanicos')
					.send(inventariomecanico)
					.expect(400)
					.end(function(inventariomecanicoSaveErr, inventariomecanicoSaveRes) {
						// Set message assertion
						(inventariomecanicoSaveRes.body.message).should.match('Please fill Inventariomecanico name');
						
						// Handle Inventariomecanico save error
						done(inventariomecanicoSaveErr);
					});
			});
	});

	it('should be able to update Inventariomecanico instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inventariomecanico
				agent.post('/inventariomecanicos')
					.send(inventariomecanico)
					.expect(200)
					.end(function(inventariomecanicoSaveErr, inventariomecanicoSaveRes) {
						// Handle Inventariomecanico save error
						if (inventariomecanicoSaveErr) done(inventariomecanicoSaveErr);

						// Update Inventariomecanico name
						inventariomecanico.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Inventariomecanico
						agent.put('/inventariomecanicos/' + inventariomecanicoSaveRes.body._id)
							.send(inventariomecanico)
							.expect(200)
							.end(function(inventariomecanicoUpdateErr, inventariomecanicoUpdateRes) {
								// Handle Inventariomecanico update error
								if (inventariomecanicoUpdateErr) done(inventariomecanicoUpdateErr);

								// Set assertions
								(inventariomecanicoUpdateRes.body._id).should.equal(inventariomecanicoSaveRes.body._id);
								(inventariomecanicoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Inventariomecanicos if not signed in', function(done) {
		// Create new Inventariomecanico model instance
		var inventariomecanicoObj = new Inventariomecanico(inventariomecanico);

		// Save the Inventariomecanico
		inventariomecanicoObj.save(function() {
			// Request Inventariomecanicos
			request(app).get('/inventariomecanicos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Inventariomecanico if not signed in', function(done) {
		// Create new Inventariomecanico model instance
		var inventariomecanicoObj = new Inventariomecanico(inventariomecanico);

		// Save the Inventariomecanico
		inventariomecanicoObj.save(function() {
			request(app).get('/inventariomecanicos/' + inventariomecanicoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', inventariomecanico.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Inventariomecanico instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inventariomecanico
				agent.post('/inventariomecanicos')
					.send(inventariomecanico)
					.expect(200)
					.end(function(inventariomecanicoSaveErr, inventariomecanicoSaveRes) {
						// Handle Inventariomecanico save error
						if (inventariomecanicoSaveErr) done(inventariomecanicoSaveErr);

						// Delete existing Inventariomecanico
						agent.delete('/inventariomecanicos/' + inventariomecanicoSaveRes.body._id)
							.send(inventariomecanico)
							.expect(200)
							.end(function(inventariomecanicoDeleteErr, inventariomecanicoDeleteRes) {
								// Handle Inventariomecanico error error
								if (inventariomecanicoDeleteErr) done(inventariomecanicoDeleteErr);

								// Set assertions
								(inventariomecanicoDeleteRes.body._id).should.equal(inventariomecanicoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Inventariomecanico instance if not signed in', function(done) {
		// Set Inventariomecanico user 
		inventariomecanico.user = user;

		// Create new Inventariomecanico model instance
		var inventariomecanicoObj = new Inventariomecanico(inventariomecanico);

		// Save the Inventariomecanico
		inventariomecanicoObj.save(function() {
			// Try deleting Inventariomecanico
			request(app).delete('/inventariomecanicos/' + inventariomecanicoObj._id)
			.expect(401)
			.end(function(inventariomecanicoDeleteErr, inventariomecanicoDeleteRes) {
				// Set message assertion
				(inventariomecanicoDeleteRes.body.message).should.match('User is not logged in');

				// Handle Inventariomecanico error error
				done(inventariomecanicoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Inventariomecanico.remove().exec(function(){
				done();
			});	
		});
	});
});

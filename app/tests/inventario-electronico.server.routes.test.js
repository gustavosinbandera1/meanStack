'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	InventarioElectronico = mongoose.model('InventarioElectronico'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, inventarioElectronico;

/**
 * Inventario electronico routes tests
 */
describe('Inventario electronico CRUD tests', function() {
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

		// Save a user to the test db and create new Inventario electronico
		user.save(function() {
			inventarioElectronico = {
				name: 'Inventario electronico Name'
			};

			done();
		});
	});

	it('should be able to save Inventario electronico instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inventario electronico
				agent.post('/inventario-electronicos')
					.send(inventarioElectronico)
					.expect(200)
					.end(function(inventarioElectronicoSaveErr, inventarioElectronicoSaveRes) {
						// Handle Inventario electronico save error
						if (inventarioElectronicoSaveErr) done(inventarioElectronicoSaveErr);

						// Get a list of Inventario electronicos
						agent.get('/inventario-electronicos')
							.end(function(inventarioElectronicosGetErr, inventarioElectronicosGetRes) {
								// Handle Inventario electronico save error
								if (inventarioElectronicosGetErr) done(inventarioElectronicosGetErr);

								// Get Inventario electronicos list
								var inventarioElectronicos = inventarioElectronicosGetRes.body;

								// Set assertions
								(inventarioElectronicos[0].user._id).should.equal(userId);
								(inventarioElectronicos[0].name).should.match('Inventario electronico Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Inventario electronico instance if not logged in', function(done) {
		agent.post('/inventario-electronicos')
			.send(inventarioElectronico)
			.expect(401)
			.end(function(inventarioElectronicoSaveErr, inventarioElectronicoSaveRes) {
				// Call the assertion callback
				done(inventarioElectronicoSaveErr);
			});
	});

	it('should not be able to save Inventario electronico instance if no name is provided', function(done) {
		// Invalidate name field
		inventarioElectronico.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inventario electronico
				agent.post('/inventario-electronicos')
					.send(inventarioElectronico)
					.expect(400)
					.end(function(inventarioElectronicoSaveErr, inventarioElectronicoSaveRes) {
						// Set message assertion
						(inventarioElectronicoSaveRes.body.message).should.match('Please fill Inventario electronico name');
						
						// Handle Inventario electronico save error
						done(inventarioElectronicoSaveErr);
					});
			});
	});

	it('should be able to update Inventario electronico instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inventario electronico
				agent.post('/inventario-electronicos')
					.send(inventarioElectronico)
					.expect(200)
					.end(function(inventarioElectronicoSaveErr, inventarioElectronicoSaveRes) {
						// Handle Inventario electronico save error
						if (inventarioElectronicoSaveErr) done(inventarioElectronicoSaveErr);

						// Update Inventario electronico name
						inventarioElectronico.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Inventario electronico
						agent.put('/inventario-electronicos/' + inventarioElectronicoSaveRes.body._id)
							.send(inventarioElectronico)
							.expect(200)
							.end(function(inventarioElectronicoUpdateErr, inventarioElectronicoUpdateRes) {
								// Handle Inventario electronico update error
								if (inventarioElectronicoUpdateErr) done(inventarioElectronicoUpdateErr);

								// Set assertions
								(inventarioElectronicoUpdateRes.body._id).should.equal(inventarioElectronicoSaveRes.body._id);
								(inventarioElectronicoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Inventario electronicos if not signed in', function(done) {
		// Create new Inventario electronico model instance
		var inventarioElectronicoObj = new InventarioElectronico(inventarioElectronico);

		// Save the Inventario electronico
		inventarioElectronicoObj.save(function() {
			// Request Inventario electronicos
			request(app).get('/inventario-electronicos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Inventario electronico if not signed in', function(done) {
		// Create new Inventario electronico model instance
		var inventarioElectronicoObj = new InventarioElectronico(inventarioElectronico);

		// Save the Inventario electronico
		inventarioElectronicoObj.save(function() {
			request(app).get('/inventario-electronicos/' + inventarioElectronicoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', inventarioElectronico.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Inventario electronico instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inventario electronico
				agent.post('/inventario-electronicos')
					.send(inventarioElectronico)
					.expect(200)
					.end(function(inventarioElectronicoSaveErr, inventarioElectronicoSaveRes) {
						// Handle Inventario electronico save error
						if (inventarioElectronicoSaveErr) done(inventarioElectronicoSaveErr);

						// Delete existing Inventario electronico
						agent.delete('/inventario-electronicos/' + inventarioElectronicoSaveRes.body._id)
							.send(inventarioElectronico)
							.expect(200)
							.end(function(inventarioElectronicoDeleteErr, inventarioElectronicoDeleteRes) {
								// Handle Inventario electronico error error
								if (inventarioElectronicoDeleteErr) done(inventarioElectronicoDeleteErr);

								// Set assertions
								(inventarioElectronicoDeleteRes.body._id).should.equal(inventarioElectronicoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Inventario electronico instance if not signed in', function(done) {
		// Set Inventario electronico user 
		inventarioElectronico.user = user;

		// Create new Inventario electronico model instance
		var inventarioElectronicoObj = new InventarioElectronico(inventarioElectronico);

		// Save the Inventario electronico
		inventarioElectronicoObj.save(function() {
			// Try deleting Inventario electronico
			request(app).delete('/inventario-electronicos/' + inventarioElectronicoObj._id)
			.expect(401)
			.end(function(inventarioElectronicoDeleteErr, inventarioElectronicoDeleteRes) {
				// Set message assertion
				(inventarioElectronicoDeleteRes.body.message).should.match('User is not logged in');

				// Handle Inventario electronico error error
				done(inventarioElectronicoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			InventarioElectronico.remove().exec(function(){
				done();
			});	
		});
	});
});

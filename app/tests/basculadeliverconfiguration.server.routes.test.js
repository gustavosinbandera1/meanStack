'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Basculadeliverconfiguration = mongoose.model('Basculadeliverconfiguration'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, basculadeliverconfiguration;

/**
 * Basculadeliverconfiguration routes tests
 */
describe('Basculadeliverconfiguration CRUD tests', function() {
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

		// Save a user to the test db and create new Basculadeliverconfiguration
		user.save(function() {
			basculadeliverconfiguration = {
				name: 'Basculadeliverconfiguration Name'
			};

			done();
		});
	});

	it('should be able to save Basculadeliverconfiguration instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Basculadeliverconfiguration
				agent.post('/basculadeliverconfigurations')
					.send(basculadeliverconfiguration)
					.expect(200)
					.end(function(basculadeliverconfigurationSaveErr, basculadeliverconfigurationSaveRes) {
						// Handle Basculadeliverconfiguration save error
						if (basculadeliverconfigurationSaveErr) done(basculadeliverconfigurationSaveErr);

						// Get a list of Basculadeliverconfigurations
						agent.get('/basculadeliverconfigurations')
							.end(function(basculadeliverconfigurationsGetErr, basculadeliverconfigurationsGetRes) {
								// Handle Basculadeliverconfiguration save error
								if (basculadeliverconfigurationsGetErr) done(basculadeliverconfigurationsGetErr);

								// Get Basculadeliverconfigurations list
								var basculadeliverconfigurations = basculadeliverconfigurationsGetRes.body;

								// Set assertions
								(basculadeliverconfigurations[0].user._id).should.equal(userId);
								(basculadeliverconfigurations[0].name).should.match('Basculadeliverconfiguration Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Basculadeliverconfiguration instance if not logged in', function(done) {
		agent.post('/basculadeliverconfigurations')
			.send(basculadeliverconfiguration)
			.expect(401)
			.end(function(basculadeliverconfigurationSaveErr, basculadeliverconfigurationSaveRes) {
				// Call the assertion callback
				done(basculadeliverconfigurationSaveErr);
			});
	});

	it('should not be able to save Basculadeliverconfiguration instance if no name is provided', function(done) {
		// Invalidate name field
		basculadeliverconfiguration.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Basculadeliverconfiguration
				agent.post('/basculadeliverconfigurations')
					.send(basculadeliverconfiguration)
					.expect(400)
					.end(function(basculadeliverconfigurationSaveErr, basculadeliverconfigurationSaveRes) {
						// Set message assertion
						(basculadeliverconfigurationSaveRes.body.message).should.match('Please fill Basculadeliverconfiguration name');
						
						// Handle Basculadeliverconfiguration save error
						done(basculadeliverconfigurationSaveErr);
					});
			});
	});

	it('should be able to update Basculadeliverconfiguration instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Basculadeliverconfiguration
				agent.post('/basculadeliverconfigurations')
					.send(basculadeliverconfiguration)
					.expect(200)
					.end(function(basculadeliverconfigurationSaveErr, basculadeliverconfigurationSaveRes) {
						// Handle Basculadeliverconfiguration save error
						if (basculadeliverconfigurationSaveErr) done(basculadeliverconfigurationSaveErr);

						// Update Basculadeliverconfiguration name
						basculadeliverconfiguration.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Basculadeliverconfiguration
						agent.put('/basculadeliverconfigurations/' + basculadeliverconfigurationSaveRes.body._id)
							.send(basculadeliverconfiguration)
							.expect(200)
							.end(function(basculadeliverconfigurationUpdateErr, basculadeliverconfigurationUpdateRes) {
								// Handle Basculadeliverconfiguration update error
								if (basculadeliverconfigurationUpdateErr) done(basculadeliverconfigurationUpdateErr);

								// Set assertions
								(basculadeliverconfigurationUpdateRes.body._id).should.equal(basculadeliverconfigurationSaveRes.body._id);
								(basculadeliverconfigurationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Basculadeliverconfigurations if not signed in', function(done) {
		// Create new Basculadeliverconfiguration model instance
		var basculadeliverconfigurationObj = new Basculadeliverconfiguration(basculadeliverconfiguration);

		// Save the Basculadeliverconfiguration
		basculadeliverconfigurationObj.save(function() {
			// Request Basculadeliverconfigurations
			request(app).get('/basculadeliverconfigurations')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Basculadeliverconfiguration if not signed in', function(done) {
		// Create new Basculadeliverconfiguration model instance
		var basculadeliverconfigurationObj = new Basculadeliverconfiguration(basculadeliverconfiguration);

		// Save the Basculadeliverconfiguration
		basculadeliverconfigurationObj.save(function() {
			request(app).get('/basculadeliverconfigurations/' + basculadeliverconfigurationObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', basculadeliverconfiguration.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Basculadeliverconfiguration instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Basculadeliverconfiguration
				agent.post('/basculadeliverconfigurations')
					.send(basculadeliverconfiguration)
					.expect(200)
					.end(function(basculadeliverconfigurationSaveErr, basculadeliverconfigurationSaveRes) {
						// Handle Basculadeliverconfiguration save error
						if (basculadeliverconfigurationSaveErr) done(basculadeliverconfigurationSaveErr);

						// Delete existing Basculadeliverconfiguration
						agent.delete('/basculadeliverconfigurations/' + basculadeliverconfigurationSaveRes.body._id)
							.send(basculadeliverconfiguration)
							.expect(200)
							.end(function(basculadeliverconfigurationDeleteErr, basculadeliverconfigurationDeleteRes) {
								// Handle Basculadeliverconfiguration error error
								if (basculadeliverconfigurationDeleteErr) done(basculadeliverconfigurationDeleteErr);

								// Set assertions
								(basculadeliverconfigurationDeleteRes.body._id).should.equal(basculadeliverconfigurationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Basculadeliverconfiguration instance if not signed in', function(done) {
		// Set Basculadeliverconfiguration user 
		basculadeliverconfiguration.user = user;

		// Create new Basculadeliverconfiguration model instance
		var basculadeliverconfigurationObj = new Basculadeliverconfiguration(basculadeliverconfiguration);

		// Save the Basculadeliverconfiguration
		basculadeliverconfigurationObj.save(function() {
			// Try deleting Basculadeliverconfiguration
			request(app).delete('/basculadeliverconfigurations/' + basculadeliverconfigurationObj._id)
			.expect(401)
			.end(function(basculadeliverconfigurationDeleteErr, basculadeliverconfigurationDeleteRes) {
				// Set message assertion
				(basculadeliverconfigurationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Basculadeliverconfiguration error error
				done(basculadeliverconfigurationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Basculadeliverconfiguration.remove().exec(function(){
				done();
			});	
		});
	});
});

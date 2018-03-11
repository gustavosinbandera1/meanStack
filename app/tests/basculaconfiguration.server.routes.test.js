'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Basculaconfiguration = mongoose.model('Basculaconfiguration'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, basculaconfiguration;

/**
 * Basculaconfiguration routes tests
 */
describe('Basculaconfiguration CRUD tests', function() {
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

		// Save a user to the test db and create new Basculaconfiguration
		user.save(function() {
			basculaconfiguration = {
				name: 'Basculaconfiguration Name'
			};

			done();
		});
	});

	it('should be able to save Basculaconfiguration instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Basculaconfiguration
				agent.post('/basculaconfigurations')
					.send(basculaconfiguration)
					.expect(200)
					.end(function(basculaconfigurationSaveErr, basculaconfigurationSaveRes) {
						// Handle Basculaconfiguration save error
						if (basculaconfigurationSaveErr) done(basculaconfigurationSaveErr);

						// Get a list of Basculaconfigurations
						agent.get('/basculaconfigurations')
							.end(function(basculaconfigurationsGetErr, basculaconfigurationsGetRes) {
								// Handle Basculaconfiguration save error
								if (basculaconfigurationsGetErr) done(basculaconfigurationsGetErr);

								// Get Basculaconfigurations list
								var basculaconfigurations = basculaconfigurationsGetRes.body;

								// Set assertions
								(basculaconfigurations[0].user._id).should.equal(userId);
								(basculaconfigurations[0].name).should.match('Basculaconfiguration Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Basculaconfiguration instance if not logged in', function(done) {
		agent.post('/basculaconfigurations')
			.send(basculaconfiguration)
			.expect(401)
			.end(function(basculaconfigurationSaveErr, basculaconfigurationSaveRes) {
				// Call the assertion callback
				done(basculaconfigurationSaveErr);
			});
	});

	it('should not be able to save Basculaconfiguration instance if no name is provided', function(done) {
		// Invalidate name field
		basculaconfiguration.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Basculaconfiguration
				agent.post('/basculaconfigurations')
					.send(basculaconfiguration)
					.expect(400)
					.end(function(basculaconfigurationSaveErr, basculaconfigurationSaveRes) {
						// Set message assertion
						(basculaconfigurationSaveRes.body.message).should.match('Please fill Basculaconfiguration name');
						
						// Handle Basculaconfiguration save error
						done(basculaconfigurationSaveErr);
					});
			});
	});

	it('should be able to update Basculaconfiguration instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Basculaconfiguration
				agent.post('/basculaconfigurations')
					.send(basculaconfiguration)
					.expect(200)
					.end(function(basculaconfigurationSaveErr, basculaconfigurationSaveRes) {
						// Handle Basculaconfiguration save error
						if (basculaconfigurationSaveErr) done(basculaconfigurationSaveErr);

						// Update Basculaconfiguration name
						basculaconfiguration.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Basculaconfiguration
						agent.put('/basculaconfigurations/' + basculaconfigurationSaveRes.body._id)
							.send(basculaconfiguration)
							.expect(200)
							.end(function(basculaconfigurationUpdateErr, basculaconfigurationUpdateRes) {
								// Handle Basculaconfiguration update error
								if (basculaconfigurationUpdateErr) done(basculaconfigurationUpdateErr);

								// Set assertions
								(basculaconfigurationUpdateRes.body._id).should.equal(basculaconfigurationSaveRes.body._id);
								(basculaconfigurationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Basculaconfigurations if not signed in', function(done) {
		// Create new Basculaconfiguration model instance
		var basculaconfigurationObj = new Basculaconfiguration(basculaconfiguration);

		// Save the Basculaconfiguration
		basculaconfigurationObj.save(function() {
			// Request Basculaconfigurations
			request(app).get('/basculaconfigurations')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Basculaconfiguration if not signed in', function(done) {
		// Create new Basculaconfiguration model instance
		var basculaconfigurationObj = new Basculaconfiguration(basculaconfiguration);

		// Save the Basculaconfiguration
		basculaconfigurationObj.save(function() {
			request(app).get('/basculaconfigurations/' + basculaconfigurationObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', basculaconfiguration.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Basculaconfiguration instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Basculaconfiguration
				agent.post('/basculaconfigurations')
					.send(basculaconfiguration)
					.expect(200)
					.end(function(basculaconfigurationSaveErr, basculaconfigurationSaveRes) {
						// Handle Basculaconfiguration save error
						if (basculaconfigurationSaveErr) done(basculaconfigurationSaveErr);

						// Delete existing Basculaconfiguration
						agent.delete('/basculaconfigurations/' + basculaconfigurationSaveRes.body._id)
							.send(basculaconfiguration)
							.expect(200)
							.end(function(basculaconfigurationDeleteErr, basculaconfigurationDeleteRes) {
								// Handle Basculaconfiguration error error
								if (basculaconfigurationDeleteErr) done(basculaconfigurationDeleteErr);

								// Set assertions
								(basculaconfigurationDeleteRes.body._id).should.equal(basculaconfigurationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Basculaconfiguration instance if not signed in', function(done) {
		// Set Basculaconfiguration user 
		basculaconfiguration.user = user;

		// Create new Basculaconfiguration model instance
		var basculaconfigurationObj = new Basculaconfiguration(basculaconfiguration);

		// Save the Basculaconfiguration
		basculaconfigurationObj.save(function() {
			// Try deleting Basculaconfiguration
			request(app).delete('/basculaconfigurations/' + basculaconfigurationObj._id)
			.expect(401)
			.end(function(basculaconfigurationDeleteErr, basculaconfigurationDeleteRes) {
				// Set message assertion
				(basculaconfigurationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Basculaconfiguration error error
				done(basculaconfigurationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Basculaconfiguration.remove().exec(function(){
				done();
			});	
		});
	});
});

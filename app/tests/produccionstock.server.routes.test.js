'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Produccionstock = mongoose.model('Produccionstock'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, produccionstock;

/**
 * Produccionstock routes tests
 */
describe('Produccionstock CRUD tests', function() {
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

		// Save a user to the test db and create new Produccionstock
		user.save(function() {
			produccionstock = {
				name: 'Produccionstock Name'
			};

			done();
		});
	});

	it('should be able to save Produccionstock instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccionstock
				agent.post('/produccionstocks')
					.send(produccionstock)
					.expect(200)
					.end(function(produccionstockSaveErr, produccionstockSaveRes) {
						// Handle Produccionstock save error
						if (produccionstockSaveErr) done(produccionstockSaveErr);

						// Get a list of Produccionstocks
						agent.get('/produccionstocks')
							.end(function(produccionstocksGetErr, produccionstocksGetRes) {
								// Handle Produccionstock save error
								if (produccionstocksGetErr) done(produccionstocksGetErr);

								// Get Produccionstocks list
								var produccionstocks = produccionstocksGetRes.body;

								// Set assertions
								(produccionstocks[0].user._id).should.equal(userId);
								(produccionstocks[0].name).should.match('Produccionstock Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Produccionstock instance if not logged in', function(done) {
		agent.post('/produccionstocks')
			.send(produccionstock)
			.expect(401)
			.end(function(produccionstockSaveErr, produccionstockSaveRes) {
				// Call the assertion callback
				done(produccionstockSaveErr);
			});
	});

	it('should not be able to save Produccionstock instance if no name is provided', function(done) {
		// Invalidate name field
		produccionstock.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccionstock
				agent.post('/produccionstocks')
					.send(produccionstock)
					.expect(400)
					.end(function(produccionstockSaveErr, produccionstockSaveRes) {
						// Set message assertion
						(produccionstockSaveRes.body.message).should.match('Please fill Produccionstock name');
						
						// Handle Produccionstock save error
						done(produccionstockSaveErr);
					});
			});
	});

	it('should be able to update Produccionstock instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccionstock
				agent.post('/produccionstocks')
					.send(produccionstock)
					.expect(200)
					.end(function(produccionstockSaveErr, produccionstockSaveRes) {
						// Handle Produccionstock save error
						if (produccionstockSaveErr) done(produccionstockSaveErr);

						// Update Produccionstock name
						produccionstock.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Produccionstock
						agent.put('/produccionstocks/' + produccionstockSaveRes.body._id)
							.send(produccionstock)
							.expect(200)
							.end(function(produccionstockUpdateErr, produccionstockUpdateRes) {
								// Handle Produccionstock update error
								if (produccionstockUpdateErr) done(produccionstockUpdateErr);

								// Set assertions
								(produccionstockUpdateRes.body._id).should.equal(produccionstockSaveRes.body._id);
								(produccionstockUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Produccionstocks if not signed in', function(done) {
		// Create new Produccionstock model instance
		var produccionstockObj = new Produccionstock(produccionstock);

		// Save the Produccionstock
		produccionstockObj.save(function() {
			// Request Produccionstocks
			request(app).get('/produccionstocks')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Produccionstock if not signed in', function(done) {
		// Create new Produccionstock model instance
		var produccionstockObj = new Produccionstock(produccionstock);

		// Save the Produccionstock
		produccionstockObj.save(function() {
			request(app).get('/produccionstocks/' + produccionstockObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', produccionstock.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Produccionstock instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccionstock
				agent.post('/produccionstocks')
					.send(produccionstock)
					.expect(200)
					.end(function(produccionstockSaveErr, produccionstockSaveRes) {
						// Handle Produccionstock save error
						if (produccionstockSaveErr) done(produccionstockSaveErr);

						// Delete existing Produccionstock
						agent.delete('/produccionstocks/' + produccionstockSaveRes.body._id)
							.send(produccionstock)
							.expect(200)
							.end(function(produccionstockDeleteErr, produccionstockDeleteRes) {
								// Handle Produccionstock error error
								if (produccionstockDeleteErr) done(produccionstockDeleteErr);

								// Set assertions
								(produccionstockDeleteRes.body._id).should.equal(produccionstockSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Produccionstock instance if not signed in', function(done) {
		// Set Produccionstock user 
		produccionstock.user = user;

		// Create new Produccionstock model instance
		var produccionstockObj = new Produccionstock(produccionstock);

		// Save the Produccionstock
		produccionstockObj.save(function() {
			// Try deleting Produccionstock
			request(app).delete('/produccionstocks/' + produccionstockObj._id)
			.expect(401)
			.end(function(produccionstockDeleteErr, produccionstockDeleteRes) {
				// Set message assertion
				(produccionstockDeleteRes.body.message).should.match('User is not logged in');

				// Handle Produccionstock error error
				done(produccionstockDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Produccionstock.remove().exec(function(){
				done();
			});	
		});
	});
});

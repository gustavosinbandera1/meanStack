'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Produccioncompany = mongoose.model('Produccioncompany'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, produccioncompany;

/**
 * Produccioncompany routes tests
 */
describe('Produccioncompany CRUD tests', function() {
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

		// Save a user to the test db and create new Produccioncompany
		user.save(function() {
			produccioncompany = {
				name: 'Produccioncompany Name'
			};

			done();
		});
	});

	it('should be able to save Produccioncompany instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccioncompany
				agent.post('/produccioncompanies')
					.send(produccioncompany)
					.expect(200)
					.end(function(produccioncompanySaveErr, produccioncompanySaveRes) {
						// Handle Produccioncompany save error
						if (produccioncompanySaveErr) done(produccioncompanySaveErr);

						// Get a list of Produccioncompanies
						agent.get('/produccioncompanies')
							.end(function(produccioncompaniesGetErr, produccioncompaniesGetRes) {
								// Handle Produccioncompany save error
								if (produccioncompaniesGetErr) done(produccioncompaniesGetErr);

								// Get Produccioncompanies list
								var produccioncompanies = produccioncompaniesGetRes.body;

								// Set assertions
								(produccioncompanies[0].user._id).should.equal(userId);
								(produccioncompanies[0].name).should.match('Produccioncompany Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Produccioncompany instance if not logged in', function(done) {
		agent.post('/produccioncompanies')
			.send(produccioncompany)
			.expect(401)
			.end(function(produccioncompanySaveErr, produccioncompanySaveRes) {
				// Call the assertion callback
				done(produccioncompanySaveErr);
			});
	});

	it('should not be able to save Produccioncompany instance if no name is provided', function(done) {
		// Invalidate name field
		produccioncompany.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccioncompany
				agent.post('/produccioncompanies')
					.send(produccioncompany)
					.expect(400)
					.end(function(produccioncompanySaveErr, produccioncompanySaveRes) {
						// Set message assertion
						(produccioncompanySaveRes.body.message).should.match('Please fill Produccioncompany name');
						
						// Handle Produccioncompany save error
						done(produccioncompanySaveErr);
					});
			});
	});

	it('should be able to update Produccioncompany instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccioncompany
				agent.post('/produccioncompanies')
					.send(produccioncompany)
					.expect(200)
					.end(function(produccioncompanySaveErr, produccioncompanySaveRes) {
						// Handle Produccioncompany save error
						if (produccioncompanySaveErr) done(produccioncompanySaveErr);

						// Update Produccioncompany name
						produccioncompany.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Produccioncompany
						agent.put('/produccioncompanies/' + produccioncompanySaveRes.body._id)
							.send(produccioncompany)
							.expect(200)
							.end(function(produccioncompanyUpdateErr, produccioncompanyUpdateRes) {
								// Handle Produccioncompany update error
								if (produccioncompanyUpdateErr) done(produccioncompanyUpdateErr);

								// Set assertions
								(produccioncompanyUpdateRes.body._id).should.equal(produccioncompanySaveRes.body._id);
								(produccioncompanyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Produccioncompanies if not signed in', function(done) {
		// Create new Produccioncompany model instance
		var produccioncompanyObj = new Produccioncompany(produccioncompany);

		// Save the Produccioncompany
		produccioncompanyObj.save(function() {
			// Request Produccioncompanies
			request(app).get('/produccioncompanies')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Produccioncompany if not signed in', function(done) {
		// Create new Produccioncompany model instance
		var produccioncompanyObj = new Produccioncompany(produccioncompany);

		// Save the Produccioncompany
		produccioncompanyObj.save(function() {
			request(app).get('/produccioncompanies/' + produccioncompanyObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', produccioncompany.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Produccioncompany instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Produccioncompany
				agent.post('/produccioncompanies')
					.send(produccioncompany)
					.expect(200)
					.end(function(produccioncompanySaveErr, produccioncompanySaveRes) {
						// Handle Produccioncompany save error
						if (produccioncompanySaveErr) done(produccioncompanySaveErr);

						// Delete existing Produccioncompany
						agent.delete('/produccioncompanies/' + produccioncompanySaveRes.body._id)
							.send(produccioncompany)
							.expect(200)
							.end(function(produccioncompanyDeleteErr, produccioncompanyDeleteRes) {
								// Handle Produccioncompany error error
								if (produccioncompanyDeleteErr) done(produccioncompanyDeleteErr);

								// Set assertions
								(produccioncompanyDeleteRes.body._id).should.equal(produccioncompanySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Produccioncompany instance if not signed in', function(done) {
		// Set Produccioncompany user 
		produccioncompany.user = user;

		// Create new Produccioncompany model instance
		var produccioncompanyObj = new Produccioncompany(produccioncompany);

		// Save the Produccioncompany
		produccioncompanyObj.save(function() {
			// Try deleting Produccioncompany
			request(app).delete('/produccioncompanies/' + produccioncompanyObj._id)
			.expect(401)
			.end(function(produccioncompanyDeleteErr, produccioncompanyDeleteRes) {
				// Set message assertion
				(produccioncompanyDeleteRes.body.message).should.match('User is not logged in');

				// Handle Produccioncompany error error
				done(produccioncompanyDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Produccioncompany.remove().exec(function(){
				done();
			});	
		});
	});
});

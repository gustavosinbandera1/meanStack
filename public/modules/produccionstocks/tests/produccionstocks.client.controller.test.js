'use strict';

(function() {
	// Produccionstocks Controller Spec
	describe('Produccionstocks Controller Tests', function() {
		// Initialize global variables
		var ProduccionstocksController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Produccionstocks controller.
			ProduccionstocksController = $controller('ProduccionstocksController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Produccionstock object fetched from XHR', inject(function(Produccionstocks) {
			// Create sample Produccionstock using the Produccionstocks service
			var sampleProduccionstock = new Produccionstocks({
				name: 'New Produccionstock'
			});

			// Create a sample Produccionstocks array that includes the new Produccionstock
			var sampleProduccionstocks = [sampleProduccionstock];

			// Set GET response
			$httpBackend.expectGET('produccionstocks').respond(sampleProduccionstocks);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.produccionstocks).toEqualData(sampleProduccionstocks);
		}));

		it('$scope.findOne() should create an array with one Produccionstock object fetched from XHR using a produccionstockId URL parameter', inject(function(Produccionstocks) {
			// Define a sample Produccionstock object
			var sampleProduccionstock = new Produccionstocks({
				name: 'New Produccionstock'
			});

			// Set the URL parameter
			$stateParams.produccionstockId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/produccionstocks\/([0-9a-fA-F]{24})$/).respond(sampleProduccionstock);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.produccionstock).toEqualData(sampleProduccionstock);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Produccionstocks) {
			// Create a sample Produccionstock object
			var sampleProduccionstockPostData = new Produccionstocks({
				name: 'New Produccionstock'
			});

			// Create a sample Produccionstock response
			var sampleProduccionstockResponse = new Produccionstocks({
				_id: '525cf20451979dea2c000001',
				name: 'New Produccionstock'
			});

			// Fixture mock form input values
			scope.name = 'New Produccionstock';

			// Set POST response
			$httpBackend.expectPOST('produccionstocks', sampleProduccionstockPostData).respond(sampleProduccionstockResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Produccionstock was created
			expect($location.path()).toBe('/produccionstocks/' + sampleProduccionstockResponse._id);
		}));

		it('$scope.update() should update a valid Produccionstock', inject(function(Produccionstocks) {
			// Define a sample Produccionstock put data
			var sampleProduccionstockPutData = new Produccionstocks({
				_id: '525cf20451979dea2c000001',
				name: 'New Produccionstock'
			});

			// Mock Produccionstock in scope
			scope.produccionstock = sampleProduccionstockPutData;

			// Set PUT response
			$httpBackend.expectPUT(/produccionstocks\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/produccionstocks/' + sampleProduccionstockPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid produccionstockId and remove the Produccionstock from the scope', inject(function(Produccionstocks) {
			// Create new Produccionstock object
			var sampleProduccionstock = new Produccionstocks({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Produccionstocks array and include the Produccionstock
			scope.produccionstocks = [sampleProduccionstock];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/produccionstocks\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProduccionstock);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.produccionstocks.length).toBe(0);
		}));
	});
}());
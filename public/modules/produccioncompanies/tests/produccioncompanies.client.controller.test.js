'use strict';

(function() {
	// Produccioncompanies Controller Spec
	describe('Produccioncompanies Controller Tests', function() {
		// Initialize global variables
		var ProduccioncompaniesController,
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

			// Initialize the Produccioncompanies controller.
			ProduccioncompaniesController = $controller('ProduccioncompaniesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Produccioncompany object fetched from XHR', inject(function(Produccioncompanies) {
			// Create sample Produccioncompany using the Produccioncompanies service
			var sampleProduccioncompany = new Produccioncompanies({
				name: 'New Produccioncompany'
			});

			// Create a sample Produccioncompanies array that includes the new Produccioncompany
			var sampleProduccioncompanies = [sampleProduccioncompany];

			// Set GET response
			$httpBackend.expectGET('produccioncompanies').respond(sampleProduccioncompanies);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.produccioncompanies).toEqualData(sampleProduccioncompanies);
		}));

		it('$scope.findOne() should create an array with one Produccioncompany object fetched from XHR using a produccioncompanyId URL parameter', inject(function(Produccioncompanies) {
			// Define a sample Produccioncompany object
			var sampleProduccioncompany = new Produccioncompanies({
				name: 'New Produccioncompany'
			});

			// Set the URL parameter
			$stateParams.produccioncompanyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/produccioncompanies\/([0-9a-fA-F]{24})$/).respond(sampleProduccioncompany);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.produccioncompany).toEqualData(sampleProduccioncompany);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Produccioncompanies) {
			// Create a sample Produccioncompany object
			var sampleProduccioncompanyPostData = new Produccioncompanies({
				name: 'New Produccioncompany'
			});

			// Create a sample Produccioncompany response
			var sampleProduccioncompanyResponse = new Produccioncompanies({
				_id: '525cf20451979dea2c000001',
				name: 'New Produccioncompany'
			});

			// Fixture mock form input values
			scope.name = 'New Produccioncompany';

			// Set POST response
			$httpBackend.expectPOST('produccioncompanies', sampleProduccioncompanyPostData).respond(sampleProduccioncompanyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Produccioncompany was created
			expect($location.path()).toBe('/produccioncompanies/' + sampleProduccioncompanyResponse._id);
		}));

		it('$scope.update() should update a valid Produccioncompany', inject(function(Produccioncompanies) {
			// Define a sample Produccioncompany put data
			var sampleProduccioncompanyPutData = new Produccioncompanies({
				_id: '525cf20451979dea2c000001',
				name: 'New Produccioncompany'
			});

			// Mock Produccioncompany in scope
			scope.produccioncompany = sampleProduccioncompanyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/produccioncompanies\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/produccioncompanies/' + sampleProduccioncompanyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid produccioncompanyId and remove the Produccioncompany from the scope', inject(function(Produccioncompanies) {
			// Create new Produccioncompany object
			var sampleProduccioncompany = new Produccioncompanies({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Produccioncompanies array and include the Produccioncompany
			scope.produccioncompanies = [sampleProduccioncompany];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/produccioncompanies\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProduccioncompany);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.produccioncompanies.length).toBe(0);
		}));
	});
}());
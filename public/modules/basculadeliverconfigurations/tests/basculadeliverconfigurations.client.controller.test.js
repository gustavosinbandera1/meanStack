'use strict';

(function() {
	// Basculadeliverconfigurations Controller Spec
	describe('Basculadeliverconfigurations Controller Tests', function() {
		// Initialize global variables
		var BasculadeliverconfigurationsController,
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

			// Initialize the Basculadeliverconfigurations controller.
			BasculadeliverconfigurationsController = $controller('BasculadeliverconfigurationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Basculadeliverconfiguration object fetched from XHR', inject(function(Basculadeliverconfigurations) {
			// Create sample Basculadeliverconfiguration using the Basculadeliverconfigurations service
			var sampleBasculadeliverconfiguration = new Basculadeliverconfigurations({
				name: 'New Basculadeliverconfiguration'
			});

			// Create a sample Basculadeliverconfigurations array that includes the new Basculadeliverconfiguration
			var sampleBasculadeliverconfigurations = [sampleBasculadeliverconfiguration];

			// Set GET response
			$httpBackend.expectGET('basculadeliverconfigurations').respond(sampleBasculadeliverconfigurations);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.basculadeliverconfigurations).toEqualData(sampleBasculadeliverconfigurations);
		}));

		it('$scope.findOne() should create an array with one Basculadeliverconfiguration object fetched from XHR using a basculadeliverconfigurationId URL parameter', inject(function(Basculadeliverconfigurations) {
			// Define a sample Basculadeliverconfiguration object
			var sampleBasculadeliverconfiguration = new Basculadeliverconfigurations({
				name: 'New Basculadeliverconfiguration'
			});

			// Set the URL parameter
			$stateParams.basculadeliverconfigurationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/basculadeliverconfigurations\/([0-9a-fA-F]{24})$/).respond(sampleBasculadeliverconfiguration);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.basculadeliverconfiguration).toEqualData(sampleBasculadeliverconfiguration);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Basculadeliverconfigurations) {
			// Create a sample Basculadeliverconfiguration object
			var sampleBasculadeliverconfigurationPostData = new Basculadeliverconfigurations({
				name: 'New Basculadeliverconfiguration'
			});

			// Create a sample Basculadeliverconfiguration response
			var sampleBasculadeliverconfigurationResponse = new Basculadeliverconfigurations({
				_id: '525cf20451979dea2c000001',
				name: 'New Basculadeliverconfiguration'
			});

			// Fixture mock form input values
			scope.name = 'New Basculadeliverconfiguration';

			// Set POST response
			$httpBackend.expectPOST('basculadeliverconfigurations', sampleBasculadeliverconfigurationPostData).respond(sampleBasculadeliverconfigurationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Basculadeliverconfiguration was created
			expect($location.path()).toBe('/basculadeliverconfigurations/' + sampleBasculadeliverconfigurationResponse._id);
		}));

		it('$scope.update() should update a valid Basculadeliverconfiguration', inject(function(Basculadeliverconfigurations) {
			// Define a sample Basculadeliverconfiguration put data
			var sampleBasculadeliverconfigurationPutData = new Basculadeliverconfigurations({
				_id: '525cf20451979dea2c000001',
				name: 'New Basculadeliverconfiguration'
			});

			// Mock Basculadeliverconfiguration in scope
			scope.basculadeliverconfiguration = sampleBasculadeliverconfigurationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/basculadeliverconfigurations\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/basculadeliverconfigurations/' + sampleBasculadeliverconfigurationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid basculadeliverconfigurationId and remove the Basculadeliverconfiguration from the scope', inject(function(Basculadeliverconfigurations) {
			// Create new Basculadeliverconfiguration object
			var sampleBasculadeliverconfiguration = new Basculadeliverconfigurations({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Basculadeliverconfigurations array and include the Basculadeliverconfiguration
			scope.basculadeliverconfigurations = [sampleBasculadeliverconfiguration];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/basculadeliverconfigurations\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBasculadeliverconfiguration);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.basculadeliverconfigurations.length).toBe(0);
		}));
	});
}());
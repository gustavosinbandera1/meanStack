'use strict';

(function() {
	// Basculaconfigurations Controller Spec
	describe('Basculaconfigurations Controller Tests', function() {
		// Initialize global variables
		var BasculaconfigurationsController,
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

			// Initialize the Basculaconfigurations controller.
			BasculaconfigurationsController = $controller('BasculaconfigurationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Basculaconfiguration object fetched from XHR', inject(function(Basculaconfigurations) {
			// Create sample Basculaconfiguration using the Basculaconfigurations service
			var sampleBasculaconfiguration = new Basculaconfigurations({
				name: 'New Basculaconfiguration'
			});

			// Create a sample Basculaconfigurations array that includes the new Basculaconfiguration
			var sampleBasculaconfigurations = [sampleBasculaconfiguration];

			// Set GET response
			$httpBackend.expectGET('basculaconfigurations').respond(sampleBasculaconfigurations);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.basculaconfigurations).toEqualData(sampleBasculaconfigurations);
		}));

		it('$scope.findOne() should create an array with one Basculaconfiguration object fetched from XHR using a basculaconfigurationId URL parameter', inject(function(Basculaconfigurations) {
			// Define a sample Basculaconfiguration object
			var sampleBasculaconfiguration = new Basculaconfigurations({
				name: 'New Basculaconfiguration'
			});

			// Set the URL parameter
			$stateParams.basculaconfigurationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/basculaconfigurations\/([0-9a-fA-F]{24})$/).respond(sampleBasculaconfiguration);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.basculaconfiguration).toEqualData(sampleBasculaconfiguration);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Basculaconfigurations) {
			// Create a sample Basculaconfiguration object
			var sampleBasculaconfigurationPostData = new Basculaconfigurations({
				name: 'New Basculaconfiguration'
			});

			// Create a sample Basculaconfiguration response
			var sampleBasculaconfigurationResponse = new Basculaconfigurations({
				_id: '525cf20451979dea2c000001',
				name: 'New Basculaconfiguration'
			});

			// Fixture mock form input values
			scope.name = 'New Basculaconfiguration';

			// Set POST response
			$httpBackend.expectPOST('basculaconfigurations', sampleBasculaconfigurationPostData).respond(sampleBasculaconfigurationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Basculaconfiguration was created
			expect($location.path()).toBe('/basculaconfigurations/' + sampleBasculaconfigurationResponse._id);
		}));

		it('$scope.update() should update a valid Basculaconfiguration', inject(function(Basculaconfigurations) {
			// Define a sample Basculaconfiguration put data
			var sampleBasculaconfigurationPutData = new Basculaconfigurations({
				_id: '525cf20451979dea2c000001',
				name: 'New Basculaconfiguration'
			});

			// Mock Basculaconfiguration in scope
			scope.basculaconfiguration = sampleBasculaconfigurationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/basculaconfigurations\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/basculaconfigurations/' + sampleBasculaconfigurationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid basculaconfigurationId and remove the Basculaconfiguration from the scope', inject(function(Basculaconfigurations) {
			// Create new Basculaconfiguration object
			var sampleBasculaconfiguration = new Basculaconfigurations({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Basculaconfigurations array and include the Basculaconfiguration
			scope.basculaconfigurations = [sampleBasculaconfiguration];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/basculaconfigurations\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBasculaconfiguration);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.basculaconfigurations.length).toBe(0);
		}));
	});
}());
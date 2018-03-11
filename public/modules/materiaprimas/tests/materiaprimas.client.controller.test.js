'use strict';

(function() {
	// Materiaprimas Controller Spec
	describe('Materiaprimas Controller Tests', function() {
		// Initialize global variables
		var MateriaprimasController,
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

			// Initialize the Materiaprimas controller.
			MateriaprimasController = $controller('MateriaprimasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Materiaprima object fetched from XHR', inject(function(Materiaprimas) {
			// Create sample Materiaprima using the Materiaprimas service
			var sampleMateriaprima = new Materiaprimas({
				name: 'New Materiaprima'
			});

			// Create a sample Materiaprimas array that includes the new Materiaprima
			var sampleMateriaprimas = [sampleMateriaprima];

			// Set GET response
			$httpBackend.expectGET('materiaprimas').respond(sampleMateriaprimas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.materiaprimas).toEqualData(sampleMateriaprimas);
		}));

		it('$scope.findOne() should create an array with one Materiaprima object fetched from XHR using a materiaprimaId URL parameter', inject(function(Materiaprimas) {
			// Define a sample Materiaprima object
			var sampleMateriaprima = new Materiaprimas({
				name: 'New Materiaprima'
			});

			// Set the URL parameter
			$stateParams.materiaprimaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/materiaprimas\/([0-9a-fA-F]{24})$/).respond(sampleMateriaprima);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.materiaprima).toEqualData(sampleMateriaprima);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Materiaprimas) {
			// Create a sample Materiaprima object
			var sampleMateriaprimaPostData = new Materiaprimas({
				name: 'New Materiaprima'
			});

			// Create a sample Materiaprima response
			var sampleMateriaprimaResponse = new Materiaprimas({
				_id: '525cf20451979dea2c000001',
				name: 'New Materiaprima'
			});

			// Fixture mock form input values
			scope.name = 'New Materiaprima';

			// Set POST response
			$httpBackend.expectPOST('materiaprimas', sampleMateriaprimaPostData).respond(sampleMateriaprimaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Materiaprima was created
			expect($location.path()).toBe('/materiaprimas/' + sampleMateriaprimaResponse._id);
		}));

		it('$scope.update() should update a valid Materiaprima', inject(function(Materiaprimas) {
			// Define a sample Materiaprima put data
			var sampleMateriaprimaPutData = new Materiaprimas({
				_id: '525cf20451979dea2c000001',
				name: 'New Materiaprima'
			});

			// Mock Materiaprima in scope
			scope.materiaprima = sampleMateriaprimaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/materiaprimas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/materiaprimas/' + sampleMateriaprimaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid materiaprimaId and remove the Materiaprima from the scope', inject(function(Materiaprimas) {
			// Create new Materiaprima object
			var sampleMateriaprima = new Materiaprimas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Materiaprimas array and include the Materiaprima
			scope.materiaprimas = [sampleMateriaprima];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/materiaprimas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMateriaprima);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.materiaprimas.length).toBe(0);
		}));
	});
}());
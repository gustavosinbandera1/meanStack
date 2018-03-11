'use strict';

(function() {
	// Despachoproduccions Controller Spec
	describe('Despachoproduccions Controller Tests', function() {
		// Initialize global variables
		var DespachoproduccionsController,
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

			// Initialize the Despachoproduccions controller.
			DespachoproduccionsController = $controller('DespachoproduccionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Despachoproduccion object fetched from XHR', inject(function(Despachoproduccions) {
			// Create sample Despachoproduccion using the Despachoproduccions service
			var sampleDespachoproduccion = new Despachoproduccions({
				name: 'New Despachoproduccion'
			});

			// Create a sample Despachoproduccions array that includes the new Despachoproduccion
			var sampleDespachoproduccions = [sampleDespachoproduccion];

			// Set GET response
			$httpBackend.expectGET('despachoproduccions').respond(sampleDespachoproduccions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.despachoproduccions).toEqualData(sampleDespachoproduccions);
		}));

		it('$scope.findOne() should create an array with one Despachoproduccion object fetched from XHR using a despachoproduccionId URL parameter', inject(function(Despachoproduccions) {
			// Define a sample Despachoproduccion object
			var sampleDespachoproduccion = new Despachoproduccions({
				name: 'New Despachoproduccion'
			});

			// Set the URL parameter
			$stateParams.despachoproduccionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/despachoproduccions\/([0-9a-fA-F]{24})$/).respond(sampleDespachoproduccion);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.despachoproduccion).toEqualData(sampleDespachoproduccion);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Despachoproduccions) {
			// Create a sample Despachoproduccion object
			var sampleDespachoproduccionPostData = new Despachoproduccions({
				name: 'New Despachoproduccion'
			});

			// Create a sample Despachoproduccion response
			var sampleDespachoproduccionResponse = new Despachoproduccions({
				_id: '525cf20451979dea2c000001',
				name: 'New Despachoproduccion'
			});

			// Fixture mock form input values
			scope.name = 'New Despachoproduccion';

			// Set POST response
			$httpBackend.expectPOST('despachoproduccions', sampleDespachoproduccionPostData).respond(sampleDespachoproduccionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Despachoproduccion was created
			expect($location.path()).toBe('/despachoproduccions/' + sampleDespachoproduccionResponse._id);
		}));

		it('$scope.update() should update a valid Despachoproduccion', inject(function(Despachoproduccions) {
			// Define a sample Despachoproduccion put data
			var sampleDespachoproduccionPutData = new Despachoproduccions({
				_id: '525cf20451979dea2c000001',
				name: 'New Despachoproduccion'
			});

			// Mock Despachoproduccion in scope
			scope.despachoproduccion = sampleDespachoproduccionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/despachoproduccions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/despachoproduccions/' + sampleDespachoproduccionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid despachoproduccionId and remove the Despachoproduccion from the scope', inject(function(Despachoproduccions) {
			// Create new Despachoproduccion object
			var sampleDespachoproduccion = new Despachoproduccions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Despachoproduccions array and include the Despachoproduccion
			scope.despachoproduccions = [sampleDespachoproduccion];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/despachoproduccions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDespachoproduccion);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.despachoproduccions.length).toBe(0);
		}));
	});
}());
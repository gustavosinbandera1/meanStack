'use strict';

(function() {
	// Produccions Controller Spec
	describe('Produccions Controller Tests', function() {
		// Initialize global variables
		var ProduccionsController,
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

			// Initialize the Produccions controller.
			ProduccionsController = $controller('ProduccionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Produccion object fetched from XHR', inject(function(Produccions) {
			// Create sample Produccion using the Produccions service
			var sampleProduccion = new Produccions({
				name: 'New Produccion'
			});

			// Create a sample Produccions array that includes the new Produccion
			var sampleProduccions = [sampleProduccion];

			// Set GET response
			$httpBackend.expectGET('produccions').respond(sampleProduccions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.produccions).toEqualData(sampleProduccions);
		}));

		it('$scope.findOne() should create an array with one Produccion object fetched from XHR using a produccionId URL parameter', inject(function(Produccions) {
			// Define a sample Produccion object
			var sampleProduccion = new Produccions({
				name: 'New Produccion'
			});

			// Set the URL parameter
			$stateParams.produccionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/produccions\/([0-9a-fA-F]{24})$/).respond(sampleProduccion);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.produccion).toEqualData(sampleProduccion);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Produccions) {
			// Create a sample Produccion object
			var sampleProduccionPostData = new Produccions({
				name: 'New Produccion'
			});

			// Create a sample Produccion response
			var sampleProduccionResponse = new Produccions({
				_id: '525cf20451979dea2c000001',
				name: 'New Produccion'
			});

			// Fixture mock form input values
			scope.name = 'New Produccion';

			// Set POST response
			$httpBackend.expectPOST('produccions', sampleProduccionPostData).respond(sampleProduccionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Produccion was created
			expect($location.path()).toBe('/produccions/' + sampleProduccionResponse._id);
		}));

		it('$scope.update() should update a valid Produccion', inject(function(Produccions) {
			// Define a sample Produccion put data
			var sampleProduccionPutData = new Produccions({
				_id: '525cf20451979dea2c000001',
				name: 'New Produccion'
			});

			// Mock Produccion in scope
			scope.produccion = sampleProduccionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/produccions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/produccions/' + sampleProduccionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid produccionId and remove the Produccion from the scope', inject(function(Produccions) {
			// Create new Produccion object
			var sampleProduccion = new Produccions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Produccions array and include the Produccion
			scope.produccions = [sampleProduccion];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/produccions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProduccion);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.produccions.length).toBe(0);
		}));
	});
}());
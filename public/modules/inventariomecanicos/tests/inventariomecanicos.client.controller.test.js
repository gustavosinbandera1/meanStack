'use strict';

(function() {
	// Inventariomecanicos Controller Spec
	describe('Inventariomecanicos Controller Tests', function() {
		// Initialize global variables
		var InventariomecanicosController,
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

			// Initialize the Inventariomecanicos controller.
			InventariomecanicosController = $controller('InventariomecanicosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Inventariomecanico object fetched from XHR', inject(function(Inventariomecanicos) {
			// Create sample Inventariomecanico using the Inventariomecanicos service
			var sampleInventariomecanico = new Inventariomecanicos({
				name: 'New Inventariomecanico'
			});

			// Create a sample Inventariomecanicos array that includes the new Inventariomecanico
			var sampleInventariomecanicos = [sampleInventariomecanico];

			// Set GET response
			$httpBackend.expectGET('inventariomecanicos').respond(sampleInventariomecanicos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.inventariomecanicos).toEqualData(sampleInventariomecanicos);
		}));

		it('$scope.findOne() should create an array with one Inventariomecanico object fetched from XHR using a inventariomecanicoId URL parameter', inject(function(Inventariomecanicos) {
			// Define a sample Inventariomecanico object
			var sampleInventariomecanico = new Inventariomecanicos({
				name: 'New Inventariomecanico'
			});

			// Set the URL parameter
			$stateParams.inventariomecanicoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/inventariomecanicos\/([0-9a-fA-F]{24})$/).respond(sampleInventariomecanico);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.inventariomecanico).toEqualData(sampleInventariomecanico);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Inventariomecanicos) {
			// Create a sample Inventariomecanico object
			var sampleInventariomecanicoPostData = new Inventariomecanicos({
				name: 'New Inventariomecanico'
			});

			// Create a sample Inventariomecanico response
			var sampleInventariomecanicoResponse = new Inventariomecanicos({
				_id: '525cf20451979dea2c000001',
				name: 'New Inventariomecanico'
			});

			// Fixture mock form input values
			scope.name = 'New Inventariomecanico';

			// Set POST response
			$httpBackend.expectPOST('inventariomecanicos', sampleInventariomecanicoPostData).respond(sampleInventariomecanicoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Inventariomecanico was created
			expect($location.path()).toBe('/inventariomecanicos/' + sampleInventariomecanicoResponse._id);
		}));

		it('$scope.update() should update a valid Inventariomecanico', inject(function(Inventariomecanicos) {
			// Define a sample Inventariomecanico put data
			var sampleInventariomecanicoPutData = new Inventariomecanicos({
				_id: '525cf20451979dea2c000001',
				name: 'New Inventariomecanico'
			});

			// Mock Inventariomecanico in scope
			scope.inventariomecanico = sampleInventariomecanicoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/inventariomecanicos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/inventariomecanicos/' + sampleInventariomecanicoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid inventariomecanicoId and remove the Inventariomecanico from the scope', inject(function(Inventariomecanicos) {
			// Create new Inventariomecanico object
			var sampleInventariomecanico = new Inventariomecanicos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Inventariomecanicos array and include the Inventariomecanico
			scope.inventariomecanicos = [sampleInventariomecanico];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/inventariomecanicos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInventariomecanico);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.inventariomecanicos.length).toBe(0);
		}));
	});
}());
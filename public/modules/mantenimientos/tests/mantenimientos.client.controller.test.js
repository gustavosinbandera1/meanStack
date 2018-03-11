'use strict';

(function() {
	// Mantenimientos Controller Spec
	describe('Mantenimientos Controller Tests', function() {
		// Initialize global variables
		var MantenimientosController,
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

			// Initialize the Mantenimientos controller.
			MantenimientosController = $controller('MantenimientosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Mantenimiento object fetched from XHR', inject(function(Mantenimientos) {
			// Create sample Mantenimiento using the Mantenimientos service
			var sampleMantenimiento = new Mantenimientos({
				name: 'New Mantenimiento'
			});

			// Create a sample Mantenimientos array that includes the new Mantenimiento
			var sampleMantenimientos = [sampleMantenimiento];

			// Set GET response
			$httpBackend.expectGET('mantenimientos').respond(sampleMantenimientos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mantenimientos).toEqualData(sampleMantenimientos);
		}));

		it('$scope.findOne() should create an array with one Mantenimiento object fetched from XHR using a mantenimientoId URL parameter', inject(function(Mantenimientos) {
			// Define a sample Mantenimiento object
			var sampleMantenimiento = new Mantenimientos({
				name: 'New Mantenimiento'
			});

			// Set the URL parameter
			$stateParams.mantenimientoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/mantenimientos\/([0-9a-fA-F]{24})$/).respond(sampleMantenimiento);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mantenimiento).toEqualData(sampleMantenimiento);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Mantenimientos) {
			// Create a sample Mantenimiento object
			var sampleMantenimientoPostData = new Mantenimientos({
				name: 'New Mantenimiento'
			});

			// Create a sample Mantenimiento response
			var sampleMantenimientoResponse = new Mantenimientos({
				_id: '525cf20451979dea2c000001',
				name: 'New Mantenimiento'
			});

			// Fixture mock form input values
			scope.name = 'New Mantenimiento';

			// Set POST response
			$httpBackend.expectPOST('mantenimientos', sampleMantenimientoPostData).respond(sampleMantenimientoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Mantenimiento was created
			expect($location.path()).toBe('/mantenimientos/' + sampleMantenimientoResponse._id);
		}));

		it('$scope.update() should update a valid Mantenimiento', inject(function(Mantenimientos) {
			// Define a sample Mantenimiento put data
			var sampleMantenimientoPutData = new Mantenimientos({
				_id: '525cf20451979dea2c000001',
				name: 'New Mantenimiento'
			});

			// Mock Mantenimiento in scope
			scope.mantenimiento = sampleMantenimientoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/mantenimientos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/mantenimientos/' + sampleMantenimientoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid mantenimientoId and remove the Mantenimiento from the scope', inject(function(Mantenimientos) {
			// Create new Mantenimiento object
			var sampleMantenimiento = new Mantenimientos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Mantenimientos array and include the Mantenimiento
			scope.mantenimientos = [sampleMantenimiento];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/mantenimientos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMantenimiento);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.mantenimientos.length).toBe(0);
		}));
	});
}());
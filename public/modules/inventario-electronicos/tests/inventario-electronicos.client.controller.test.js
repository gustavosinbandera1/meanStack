'use strict';

(function() {
	// Inventario electronicos Controller Spec
	describe('Inventario electronicos Controller Tests', function() {
		// Initialize global variables
		var InventarioElectronicosController,
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

			// Initialize the Inventario electronicos controller.
			InventarioElectronicosController = $controller('InventarioElectronicosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Inventario electronico object fetched from XHR', inject(function(InventarioElectronicos) {
			// Create sample Inventario electronico using the Inventario electronicos service
			var sampleInventarioElectronico = new InventarioElectronicos({
				name: 'New Inventario electronico'
			});

			// Create a sample Inventario electronicos array that includes the new Inventario electronico
			var sampleInventarioElectronicos = [sampleInventarioElectronico];

			// Set GET response
			$httpBackend.expectGET('inventario-electronicos').respond(sampleInventarioElectronicos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.inventarioElectronicos).toEqualData(sampleInventarioElectronicos);
		}));

		it('$scope.findOne() should create an array with one Inventario electronico object fetched from XHR using a inventarioElectronicoId URL parameter', inject(function(InventarioElectronicos) {
			// Define a sample Inventario electronico object
			var sampleInventarioElectronico = new InventarioElectronicos({
				name: 'New Inventario electronico'
			});

			// Set the URL parameter
			$stateParams.inventarioElectronicoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/inventario-electronicos\/([0-9a-fA-F]{24})$/).respond(sampleInventarioElectronico);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.inventarioElectronico).toEqualData(sampleInventarioElectronico);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(InventarioElectronicos) {
			// Create a sample Inventario electronico object
			var sampleInventarioElectronicoPostData = new InventarioElectronicos({
				name: 'New Inventario electronico'
			});

			// Create a sample Inventario electronico response
			var sampleInventarioElectronicoResponse = new InventarioElectronicos({
				_id: '525cf20451979dea2c000001',
				name: 'New Inventario electronico'
			});

			// Fixture mock form input values
			scope.name = 'New Inventario electronico';

			// Set POST response
			$httpBackend.expectPOST('inventario-electronicos', sampleInventarioElectronicoPostData).respond(sampleInventarioElectronicoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Inventario electronico was created
			expect($location.path()).toBe('/inventario-electronicos/' + sampleInventarioElectronicoResponse._id);
		}));

		it('$scope.update() should update a valid Inventario electronico', inject(function(InventarioElectronicos) {
			// Define a sample Inventario electronico put data
			var sampleInventarioElectronicoPutData = new InventarioElectronicos({
				_id: '525cf20451979dea2c000001',
				name: 'New Inventario electronico'
			});

			// Mock Inventario electronico in scope
			scope.inventarioElectronico = sampleInventarioElectronicoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/inventario-electronicos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/inventario-electronicos/' + sampleInventarioElectronicoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid inventarioElectronicoId and remove the Inventario electronico from the scope', inject(function(InventarioElectronicos) {
			// Create new Inventario electronico object
			var sampleInventarioElectronico = new InventarioElectronicos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Inventario electronicos array and include the Inventario electronico
			scope.inventarioElectronicos = [sampleInventarioElectronico];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/inventario-electronicos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInventarioElectronico);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.inventarioElectronicos.length).toBe(0);
		}));
	});
}());
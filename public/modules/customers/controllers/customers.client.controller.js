'use strict';

// Customers controller
angular.module('customers').controller('CustomersController', ['$scope', '$stateParams', '$location','Socket', 'Authentication', 'Customers', 'TableSettings', 'CustomersForm',
	function($scope, $stateParams, $location, Socket, Authentication, Customers, TableSettings, CustomersForm ) {
		var vm = this;
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Customers);
		$scope.customer = {};
		
		Socket.on('customer.created', function(customer) {
			console.log("nuevo customer");
    		console.log(customer);
    		$scope.tableParams.reload();
    		$location.path('customers');
		});
		Socket.on('customer.deleted', function(customer) {
			console.log("customer eliminado");
    		console.log(customer);
    		$scope.tableParams.reload();
    		$location.path('customers');
		});
		Socket.on('customer.updated', function(customer) {
			console.log("customer actualizado");
    		console.log(customer);
    		$scope.tableParams.reload();
    		$location.path('customers');
		});
		

		$scope.setFormFields = function(disabled) {
			vm.customerFields = CustomersForm.getFormFields(disabled);
		};


		// Create new Customer
		$scope.create = function() {
			var customer = new Customers($scope.customer);

			// Redirect after save
			customer.$save(function(response) {
				$location.path('customers/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			
		};

		// Remove existing Customer
		$scope.remove = function(customer) {

			if ( customer ) {
				customer = Customers.get({customerId:customer._id}, function() {
					customer.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.customer.$remove(function() {
					$location.path('customers');
				});
			}

		};

		// Update existing Customer
		$scope.update = function() {
			var customer = $scope.customer;

			customer.$update(function() {
				$location.path('customers/' + customer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewCustomer = function() {
			$scope.customer = Customers.get( {customerId: $stateParams.customerId} );
			$scope.setFormFields(true);
		};

		$scope.toEditCustomer = function() {
			$scope.customer = Customers.get( {customerId: $stateParams.customerId} );
			$scope.setFormFields(false);
		};

	}

]);

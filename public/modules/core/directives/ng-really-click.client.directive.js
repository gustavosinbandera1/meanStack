'use strict';

angular.module('core')
  .directive('ngReallyClick', ['$modal',
    function($modal) {

      var ModalInstanceCtrl = function($scope, $modalInstance) {
        $scope.ok = function() {
          $modalInstance.close();
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      };

      return {
        restrict: 'A',
        scope: {
          ngReallyClick: '&'
        },
        link: function(scope, element, attrs) {

          element.bind('click', function() {
            var message = attrs.ngReallyMessage || 'Are you sure ?';

            var modalHtml = '<div class="modal-body">' + message + '</div>';
            modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>';

            var modalInstance = $modal.open({
              template: modalHtml,
              controller: ModalInstanceCtrl
            });

            modalInstance.result.then(function() {
              scope.ngReallyClick();
            }, function() {
              //Modal dismissed
            });

          });

        }

      };

    }

  ])

  .directive('preventEnterSubmit', function () {
    return function (scope, el, attrs) {
      el.bind('keydown', function (event) {
        if (13 == event.which) {
            event.preventDefault(); // Doesn't work at all
            window.stop(); // Works in all browsers but IE...
            document.execCommand('Stop'); // Works in IE
            return false; // Don't even know why it's here. Does nothing.
        }
      });
    };
});

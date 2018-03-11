/*angular.module('produccions')
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
});*/
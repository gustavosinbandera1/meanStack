'use strict'

//socket factory that provides the socket service
angular.module('core').factory('Socket', ['socketFactory',
    function(socketFactory) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect('http://192.168.0.4:3000')
        });
    }
]);
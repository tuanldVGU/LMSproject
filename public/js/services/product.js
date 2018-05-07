angular.module('productService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Products', function($http) {
        return {
            get : function() {
                return $http.get('/api/products');
            }
        }
    });
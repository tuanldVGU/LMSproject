angular.module('chartService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Charts', function($http) {
        var savedData = {}
        function set(data) {
            savedData = data;
        }
        return {
            get : function() {
                return $http.get('/api/products');
            }
            
        }
    });
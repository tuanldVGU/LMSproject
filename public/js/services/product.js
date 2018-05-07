angular.module('productService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Products', function($http) {
        var savedData = {}
        function set(data) {
            savedData = data;
        }
        return {
            get : function() {
                return $http.get('/api/products');
            },
            create : function(name){
                return $http.post('api/product',name);
            },
            update : function(id,data){
                return $http.put('api/product/'+id,name);
            }
        }
    });
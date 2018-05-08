angular.module('itemService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Items', function($http) {
        var savedData = {}
        function set(data) {
            savedData = data;
        }
        return {
            get : function() {
                return $http.get('/api/items');
            },
            create : function(name){
                return $http.post('api/item',name);
            },
            update : function(id,data){
                return $http.put('api/item/'+id,name);
            }
        }
    });
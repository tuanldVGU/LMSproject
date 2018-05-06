angular.module('userService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Users', function($http) {
        return {
            get : function() {
                return $http.get('/api/users');
            },
            create : function(userData) {
                return $http.post('/api/users', userData);
            },
            delete : function(id) {
                return $http.delete('/api/user/' + id);
            },
            update : function(id) {
                return $http.put('/api/user/' + id);
            }
        }
    });
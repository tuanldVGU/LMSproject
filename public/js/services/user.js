angular.module('userService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Users', function($http) {
        return {
            get : function() {
                return $http.get('/api/users');
            },
            create : function(todoData) {
                return $http.post('/api/todos', todoData);
            },
            delete : function(id) {
                return $http.delete('/api/user/' + id);
            }
        }
    });
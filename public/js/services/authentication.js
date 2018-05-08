angular.module('authService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Users', function($http) {
        var savedData = {}
        function set(data) {
            savedData = data;
        }
        return {
            get : function() {
                return $http.get('/api/products');
            },
            post : function(name){
                return $http.post('api/users');
            },
            // request: function(config){
            //     config.headers = config.headers || {};
            //     if ($window.cookieStore.token){
            //         config.headers.Authorization = 'Bearer ' + $window.cookieStore.token;
            //     }
            //     return config;
            // },
            // response: function(response){
            //     if (response.status == 401){

            //     }
            //     return response || $q.when(response);
        
        }
    });

// angular.module('authService', [])
//     .config(function($httpProvider){
//         $httpProvider.interceptors.push('Users');
//     });
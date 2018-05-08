angular.module('authController', [])
	.controller('mainController',function($scope, $http){
		$scope.formData = {};
		$scope.tmp = {};
		$scope.signup = function(id) {
			$http.post('/api/users')
				.then(function(res){
					$scope.user = res.data;
				})
				.catch(function(res){
					//Export error
					console.log('Error: ' + res);
				})
		}
		
		$scope.login = function() {
			$http.post('/api/users',$scope.tmp)
				.then(function(res){
					console.log(res.data);
					if (res.data.role=="Employee") {
						console.log("i'm here");
						$location.path('/employee');}
        			else {
        			$location.path('/home');
        			}
				})
				.catch(function(res){
					//Export error
					console.log(res.data);
					console.log('Error: ' + res);
				})
		}
	})
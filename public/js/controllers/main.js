angular.module('userController', [])
	.controller('mainController',function($scope, $http){
		$scope.formData = {};

		// show all the users 
		$http.get('/api/users')
			.then(function(res){
				$scope.users = res.data;
			})
			.catch(function(res){
				//Export error
				console.log('Error: ' + res);
			});

		$scope.deleteUser = function(id) {
			$http.delete('/api/users/' + id)
				.then(function(res){
					$scope.users = res.data;
				})
				.catch(function(res){
					//Export error
					console.log('Error: ' + res);
				})
		}
	})
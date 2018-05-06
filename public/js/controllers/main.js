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
			$http.delete('/api/user/' + id)
				.then(function(res){
					$scope.user = res.data;
				})
				.catch(function(res){
					//Export error
					console.log('Error: ' + res);
				})
		}
		$scope.updateUser = function(id,data) {
			$http.put('/api/user/' + id, data)
				.then(function(res){
					$scope.user = res.data;
				})
				.catch(function(res){
					//Export error
					console.log(res.data);
					console.log('Error: ' + res);
				})
		}
	})
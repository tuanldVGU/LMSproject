
var userLMS = angular.module('userLMS', []);

function mainController($scope, $http){
	$scope.formData = {};

	// show all the users 
	$http.get('/api/users')
		.success(function(data){
			$scope.users = data;
		})
		.error(function(data){
			//Export error
		});

	$scope.deleteTodo = function(id) {
		$http.delete('/api/users/' + id)
			.success(function(data){
				$scope.users = data;
			})
			.error(function(data){
				//Export error
			})
	}
}
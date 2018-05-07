angular.module('productController', [])
	.controller('mainController',function($scope, $http){
		// show all the products
		$http.get('/api/products')
			.then(function(res){
/*				console.log(res.data[0].shop1);
				console.log('x');*/
				$scope.products = res.data;

			})
			.catch(function(res){
				//Export error
				console.log('Error: ' + res);
			})
			$scope.createShop = function(name){
				$http.post('/api/product',name)
				.then(function(res){
					$scope.users = res.data;
				})
				.catch(function(res){
					//Export error
					console.log('Error: ' + res);
				});
			}

	})



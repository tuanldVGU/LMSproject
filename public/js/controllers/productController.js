angular.module('productController', [])
	.controller('mainController',function($scope, $http){
		// show all the products
		$http.get('/api/products')
			.then(function(res){
/*				console.log(res.data[0].shop1);
				console.log('x');*/
				$scope.products = res.data[0].shop2.sold_drink;

			})
			.catch(function(res){
				//Export error
				console.log('Error: ' + res);
			});

	})



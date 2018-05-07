angular.module('productController', [])
	.controller('mainController',function($scope, $http){
		$scope.data = {};
		$scope.item = {};
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
			$scope.createShop = function(){
				$http.post('/api/product',$scope.data)
				.then(function(res){
					$scope.shop = res.data;
					console.log($scope.data);
				})
				.catch(function(res){
					//Export error
					
					console.log('Error: ' + res);
				});
			}
			$scope.updateShop = function(id,data){
				$http.put('/api/product/'+id,data)
				.then(function(res){
					$scope.abc = res.data;
				})
				.catch(function(res){
					//console.log(res.data);
					console.log("Error" + res)
				})

			}
			$scope.addItem = function(id){
				$scope.data.item.push($scope.item);
				$http.put('/api/product/'+id,$scope.data)
				.then(function(res){
					$scope.abc = res.data;
				})
				.catch(function(res){
					//console.log(res.data);
					console.log("Error" + res)
				})

			}
			$scope.getID = function(data1)
			{
				console.log("hello"+data1)
				$http.get('/api/product/'+data1)
				.then(function(res){
					$scope.data = res.data;
					console.log(res.data);
					console.log(data1);
				})
				.catch(function(res){
					//console.log(res.data);
					console.log("Error" + res)
				})
			}
		


	})



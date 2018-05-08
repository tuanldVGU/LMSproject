angular.module('itemController', [])
	.controller('mainController',function($scope, $http){
		$scope.data = {};
		$scope.item = {};
		var productNames = [];
		var qtySold = [];
		$scope.productNames = [];
		$scope.qtySold = [];
		$scope.productSelected = "";		
		// show all the products
		$scope.selectProductID = function(id){
            console.log("test"+id)
            for(var i =0; i<$scope.productShop1.length;i++)
            {
                if($scope.productShop1[i].productID==id)
                {
                    $scope.productSelected = $scope.productShop1[i].productName;
                }
            }
            
        }
		$http.get('/api/items')
			.then(function(res){
				$scope.items = res.data;				
			})
			.catch(function(res){
				//Export error
				console.log('Error: ' + res);
			})								 					 
			$scope.createItem = function(){
				$http.post('/api/item',$scope.item)
				.then(function(res){
					$scope.shop = res.data;
					console.log($scope.data);
				})
				.catch(function(res){
					//Export error
					
					console.log('Error: ' + res);
				});
			}
			$scope.updateItem = function(id,data){
				$http.put('/api/item/'+id,data)
				.then(function(res){
					$scope.abc = res.data;
				})
				.catch(function(res){
					//console.log(res.data);
					console.log("Error" + res)
				})

			}
			$scope.deleteItem = function(id){
				$http.delete('/api/item/' + id)
				.then(function(res){
					$scope.item = res.data;
				})
				.catch(function(res){
					//Export error
					console.log('Error: ' + res);
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



angular.module('checkoutController', [])
	.controller('mainController',function($scope, $http){
		$scope.data = [];
        $scope.item = {};
        $scope.item_id = {};
        $scope.item_qty = {};
        $scope.shopName = "shop1";
        
		// show all the products
        $http.get('/api/product/',$scope.shopName)
			.then(function(res){
/*				console.log(res.data[0].shop1);
				console.log('x');*/
				$scope.items = res.data.item;

			})
			.catch(function(res){
				//Export error
                console.log('Error: ' + res);
                console.log($scope.shopName);
			})
			$scope.addFunc = function(){
                console.log($scope.items)
                for(item in $scope.items) 
                {
                    if(item.productID == $scope.item_id)
                    {
                        $scope.data.push({"productName":item.productName,"price":item.price,"quantiy": $scope.item_qty});
                    }
                }
			}
			
		


	})



angular.module('dashboardController', [])
	.controller('mainController',function($scope, $http){
		$scope.data = [];
        $scope.item = {};
        $scope.totalRevenue = 0;
        $scope.item_qty = 0;
        $scope.subTotal = 0;
        $scope.totalShop = 0;
        $scope.totalEmployee =0;
        $scope.orderList = {};
        $scope.totalOrders = 0;
        $scope.productShop1 = {};
        // $scope.orderList.item=[];
		// show all the products
        $http.get('/api/products')
			.then(function(res){
/*				console.log(res.data[0].shop1);
				console.log('x');*/
                $scope.allProduct = res.data;
                $scope.productShop1 = res.data[0].item;
                $scope.totalShop = $scope.allProduct.length;
                for(var i=0;i<$scope.allProduct.length;i++)
                {
                    for(var j=0; j<$scope.allProduct[i].item.length;j++)
                    {
                        $scope.totalRevenue = $scope.totalRevenue+$scope.allProduct[i].item[j].price*$scope.allProduct[i].item[j].quantity_sold;
                    }
                }
                

			})
			.catch(function(res){
				//Export error
                console.log('Error: ' + res);
                console.log($scope.shopName);
			})
			$scope.addFunc = function(){
                //console.log($scope.item)
                for(var i=0; i<$scope.orderList.item.length;i++) 
                {
                    //console.log($scope.item[i])
                    if($scope.orderList.item[i].productID == $scope.item_id)
                    {
                        $scope.data.push({"id":i,"productID":$scope.item_id,"productName":$scope.orderList.item[i].productName,"price":$scope.orderList.item[i].price,"quantity": $scope.item_qty});
                        $scope.subTotal = $scope.subTotal + $scope.orderList.item[i].price * $scope.item_qty;
                        $scope.orderList.item[i].quantity_in_stock = $scope.item[i].quantity_in_stock - $scope.item_qty;
                        $scope.orderList.item[i].quantity_sold = parseInt($scope.item[i].quantity_sold)+parseInt($scope.item_qty);
                    }

                }
                //console.log($scope.idShop);
            }
            $scope.payFunc = function(id){
                $http.put('/api/product/'+$scope.orderList._id,$scope.orderList)
				.then(function(res){
                    $scope.abc = res.data;
                    console.log($scope.orderList)
                    $scope.data = [];
                    $scope.item_id = 0;
                    $scope.item_qty = 0;
                    $scope.subTotal = 0;
				})
				.catch(function(res){
					//console.log(res.data);
					console.log("Error" + res)
				})
            }
            $http.get('/api/users')
                .then(function(res){
    /*				console.log(res.data[0].shop1);
                    console.log('x');*/
                    console.log( res.data);
                    $scope.totalEmployee = res.data.length;
                    

                })
                $http.get('/api/orders')
                .then(function(res){
    /*				console.log(res.data[0].shop1);
                    console.log('x');*/
                    console.log( res.data);
                    $scope.totalOrders = res.data.length;
                    

                })
	})



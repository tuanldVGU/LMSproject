angular.module('dashboardController', ["chart.js"])
	.controller('mainController',function($scope, $http){
        $scope.item = {};
        $scope.totalRevenue = 0;
        $scope.item_qty = 0;
        $scope.subTotal = 0;
        $scope.totalShop = 0;
        $scope.totalEmployee =0;
        $scope.orderList = {};
        $scope.totalOrders = 0;
        $scope.productShop1 = {};

        $scope.labels = [];
        $scope.data = [];
          $scope.onClick = function (points, evt) {
            console.log(points, evt);
          };

          
        // $scope.orderList.item=[];
		// show all the products
        $http.get('/api/products')
			.then(function(res){
/*				console.log(res.data[0].shop1);
				console.log('x');*/
                $scope.allProduct = res.data;
                $scope.productShop1 = res.data[0].item;
                for(var i = 0; i<res.data[0].item.length;i++)
                {
                    $scope.labels.push(res.data[0].item[i].productName)
                    $scope.data.push(res.data[0].item[i].quantity_sold)
                }
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
            //console.log( res.data);
            $scope.totalOrders = res.data.length;
            console.log(res.data[0].quantity)

            

        })
	})



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

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
          ];
          $scope.onClick = function (points, evt) {
            console.log(points, evt);
          };

          $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
          $scope.options = {
            scales: {
              yAxes: [
                {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left'
                },
                {
                  id: 'y-axis-2',
                  type: 'linear',
                  display: true,
                  position: 'right'
                }
              ]
            }
          };
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



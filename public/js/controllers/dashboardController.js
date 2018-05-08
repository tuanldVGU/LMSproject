angular.module('dashboardController', ["chart.js"])
	.controller('mainController',function($scope, $http){
        $scope.items = [];
        $scope.products = [];
        $scope.totalRevenue = 0;
        $scope.item_qty = 0;
        $scope.subTotal = 0;
        $scope.totalShop = 0;
        $scope.totalEmployee =0;
        $scope.orderList = {};
        $scope.totalOrders = 0;
        $scope.orders = [];
        $scope.price = 0;

        //chart variable
        $scope.labels = [];
        $scope.data = [];
        $scope.series = [];
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
        $scope.init = function()
        {
            $http.get('/api/orders')
            .then(function(res){
        /*				console.log(res.data[0].shop1);
                console.log('x');*/
                //console.log( res.data);
                $scope.totalOrders = res.data.length;
                $scope.orders = res.data;
                // $scope.series.push($scope.orders[0].item[0].producID);
                //$scope.data.push([]);
                for(var i=0;i<$scope.orders.length;i++)
                        {
                            var check = true;
                            for(var j = 0 ; j<$scope.labels.length;j++)
                            {
                                if($scope.labels[k] == $scope.orders[i].day)
                                {
                                    check = false;
                                    break;
                                }
                            }
                            if (check){
                                $scope.labels.push($scope.orders[i].day)
                            }
                        }
                        for(var i=0;i<$scope.orders.length;i++)
                        {
                            var check = true;
                            var keep = 0;
                            for(var j = 0 ; j<$scope.labels.length;j++)
                            {
                                if($scope.labels[j] == $scope.orders[i].day)
                                {
                                    keep = j;
                                    break;
                                }
                            }
                            
                            for(var j=0; j<$scope.orders[i].item.length;j++)
                            {
                                for(var k =0 ; k<$scope.items.length;k++)
                                {
                                    if($scope.orders[i].item[j].productID == $scope.items[k].productID)
                                    {
                                        $scope.totalRevenue = $scope.totalRevenue+$scope.items[k].price*$scope.orders[i].item[j].quantity;
                                        break;
                                    }
                                }
                                check = true;
                                for(var k=0;k<$scope.series.length;k++)
                                {
                                    if($scope.series[k] == $scope.orders[i].item[j].productID)
                                    {
                                        check = false;
                                        break;
                                    }
                                }
                            
                                if (check){
                                    $scope.series.push($scope.orders[i].item[j].productID)
                                    $scope.data.push([])
                                    for(var k = 0 ; k<$scope.labels.length;k++)
                                    {
                                        //console.log($scope.data.length-1,k)
                                        $scope.data[$scope.data.length-1][k] = 0;
                                    }
                                }
                                for(var k =0; k<$scope.series.length;k++)
                                {
                                    if($scope.series[k] == $scope.orders[i].item[j].productID)
                                    {
                                        $scope.data[k][keep] = $scope.data[k][keep]+parseInt($scope.orders[i].item[j].quantity);
                                        console.log("Yp",keep);
                                        break;
                                    }
                                    
                                }
                            }

                        }
                        
                        console.log($scope.labels, $scope.series,$scope.data)
                
            })
        // for(var i = 0; i<$scope.totalOrders;i++)
        //         {
        //             $scope.labels.push(res.data[0].item[i].productName)
        //             $scope.data.push(res.data[0].item[i].quantity_sold)
        //         }
        
        }
        $http.get('/api/products')
        .then(function(res){
/*				console.log(res.data[0].shop1);
            console.log('x');*/
            $scope.products = res.data;
            $scope.totalShop = res.data.length;
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
            //console.log( res.data);
            $scope.totalEmployee = res.data.length;
            

        })
        $http.get('/api/items')
        .then(function(res){
/*				console.log(res.data[0].shop1);
            console.log('x');*/
            //console.log( res.data);
            $scope.items = res.data;
            

        })
    

	})



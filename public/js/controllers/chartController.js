angular.module('chartController', ["chart.js"])
	.controller('mainController',function($scope, $http){
		$scope.items = {};
		$scope.itemSelected = [];
		$http.get('/api/items')
			.then(function(res){
				$scope.items = res.data;				
			})
			.catch(function(res){
				//Export error
				console.log('Error: ' + res);
			})								 					 
			
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
				},
				responsive: true,
				maintainAspectRatio: false
			  };
			$scope.loadChart = function(timestart, timeend)
			{
				$scope.labels = [];
			$scope.data = [];
			$scope.series = [];
				var timeS = new Date(timestart);
				var timeE = new Date(timeend);
				$http.get('/api/orders')
				.then(function(res){
			/*				console.log(res.data[0].shop1);
					console.log('x');*/
					//console.log( res.data);
					$scope.totalOrders = res.data.length;
					$scope.orders = res.data;
					// $scope.series.push($scope.orders[0].item[0].producID);
					//$scope.data.push([]);
					// var test = new Date($scope.orders[0].day)

					for(var i=0;i<$scope.orders.length;i++)
					if(new Date($scope.orders[i].day) < timeE && new Date($scope.orders[i].day) > timeS)
							{
								var d = new Date($scope.orders[i].day)
								for (var j=0; j<$scope.orders[i].item.length; j++){
									$scope.itemSelected.push(
										{
											day: d.toISOString().split('T')[0],
											type: $scope.orders[i].type,
											productID : $scope.orders[i].item[j].productID,
											quantity : $scope.orders[i].item[j].quantity,
											shop: $scope.orders[i].shop
										}
									)
								}
							}
					console.log($scope.itemSelected)
					console.log(test.setHours(0,0,0,0));
					for(var i=0;i<$scope.orders.length;i++)
					if(new Date($scope.orders[i].day) < timeE && new Date($scope.orders[i].day) > timeS)
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
											//console.log("Yp",keep);
											break;
										}
										
									}
								}
	
							}
							
							//console.log($scope.labels, $scope.series,$scope.data)
					
				
						})
					}


	})



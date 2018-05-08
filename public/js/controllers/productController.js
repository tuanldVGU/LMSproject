angular.module('productController', [])
	.controller('mainController',function($scope, $http){
		$scope.data = {};
		$scope.item = {};
		var productNames = [];
		var qtySold = [];
		$scope.productNames = [];
		$scope.qtySold = [];		
		// show all the products
		$http.get('/api/products')
			.then(function(res){
				$scope.products = res.data;				
				$scope.productShop1 = res.data[0].item;
			})
			.catch(function(res){
				//Export error
				console.log('Error: ' + res);
			})
			$scope.loadChartInfo = function(data2)
			{
				// $scope.productNames = [];
				// $scope.qtySold = [];
				$http.get('/api/product/'+data2)
				.then(function(res){
					$scope.productNames = [];
					$scope.qtySold = [];
					
					$scope.data = res.data;
					angular.forEach($scope.data.item, function(value, key) {
						$scope.productNames.push(value.productName);
						$scope.qtySold.push(value.quantity_sold);
						
					});
					loadChart(productNames, qtySold);
				})
				.catch(function(res){
					console.log("Error" + res)
				})				
			 }

			 function loadChart(productNames, qtySold){					;
					$scope.loadChart = function(productNames, qtySold){
					productNames =$scope.productNames;
					qtySold = $scope.qtySold;					
					var ctx = document.getElementById("myChart").getContext('2d');			
					var chartType = document.getElementsByTagName("H3")[0].innerHTML.replace("Chart","");
					var camelize = function camelize(str) {
						return str.replace(/\W+(.)/g, function(match, chr)
						 {
							  return chr.toUpperCase();
						  });
					}
					chartType = camelize(chartType);
					chartType = chartType.substring(0,1).toLowerCase() + chartType.substring(1).trim();
					var myChart = new Chart(ctx, {
						type: chartType,
						data: {
							labels: productNames,
							datasets: [{
								label: '# of qty sold',
								data: qtySold,
								backgroundColor: [
									'rgba(255, 99, 132, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(255, 206, 86, 0.2)',
									'rgba(75, 192, 192, 0.2)',
									'rgba(153, 102, 255, 0.2)',
									'rgba(255, 159, 64, 0.2)'
								],
								borderColor: [
									'rgba(255,99,132,1)',
									'rgba(54, 162, 235, 1)',
									'rgba(255, 206, 86, 1)',
									'rgba(75, 192, 192, 1)',
									'rgba(153, 102, 255, 1)',
									'rgba(255, 159, 64, 1)'
								],
								borderWidth: 1
							}]
						},
						options: {
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero:true
									}
								}]
							}
						}
					});
				}
			}
											 					 
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
			$scope.deleteShop = function(itemID, shopID,data){
				console.log(itemID);
				console.log(shopID);
				console.log(data);
				for(var i = 0; i <data.item.length;i++)
				{
					if(data.item[i]._id == itemID){
						data.item.splice(i,1);
					}
				}
				console.log(data);
				$http.put('/api/product/'+shopID,data)
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



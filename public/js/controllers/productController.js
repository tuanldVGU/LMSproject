angular.module('productController', [])
	.controller('mainController',function($scope, $http){
		$scope.data = {};
		$scope.item = {};
		$scope.data.item=[];
		var productNames = [];
		var qtySold = [];
		$scope.productNames = [];
		$scope.qtySold = [];
		$scope.productSelected = "";
		$scope.itemListName = [];
		$scope.quantityItem = [];
		$scope.counter = 0;		
		$scope.products = {};
		// show all the products
		$scope.selectProductID = function(id){
            console.log("test"+id)
            for(var i =0; i<$scope.items.length;i++)
            {
				
                if($scope.items[i].productID==id)
                {
					$scope.productSelected = $scope.items[i].productName;
					//console.log("test"+$scope.productSelected)
                }
            }
            
		}
		$http.get('/api/items')
            .then(function(res){
				$scope.items = res.data;
				for(var i = 0 ; i<$scope.items.length;i++)
				{
					$scope.itemListName[$scope.items[i].productID] = $scope.items[i].productName;
				}
				//console.log($scope.itemListName);
			})
			$http.get('/api/orders')
            .then(function(res){
        /*				console.log(res.data[0].shop1);
                console.log('x');*/
                //console.log( res.data);
				//$scope.quantityItem = $scope.products.item;
				$scope.withdraw = new Array();
				$scope.deposit = new Array();
				var shopList = [];
				//console.log($scope.products)
                for(var i =0 ; i<$scope.products.length;i++)
                {
                	$scope.withdraw[i] = new Array();
					$scope.deposit[i] = new Array();
					shopList[i] = $scope.products[i].name;
					for(var j = 0 ; j<$scope.products[i].item.length;j++)
					{
						$scope.withdraw[i][$scope.products[i].item[j].productID]=0;
						$scope.deposit[i][$scope.products[i].item[j].productID]=0;
					}
                }
                $scope.orders = res.data;
                for(var i = 0; i<$scope.orders.length;i++)
                {
					for (var k = 0; k< shopList.length;k++)
					{
						if(($scope.orders[i].type == "withdraw") && ($scope.orders[i].shop == shopList[k]) )
						{
							
							for (var j = 0; j<$scope.orders[i].item.length; j++)
							{
								$scope.withdraw[k][$scope.orders[i].item[j].productID] 
								= $scope.withdraw[k][$scope.orders[i].item[j].productID] 
								+ $scope.orders[i].item[j].quantity;
							}
							
						}
						if($scope.orders[i].type == "deposit" && ($scope.orders[i].shop == shopList[k]))
						{
							for (var j = 0; j<$scope.orders[i].item.length; j++)
							{
								$scope.deposit[k][$scope.orders[i].item[j].productID] 
								= $scope.deposit[k][$scope.orders[i].item[j].productID] 
								+ $scope.orders[i].item[j].quantity;
							}
						}
					}
                    
                }
			})
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
					$scope.qtyinstock = [];
					console.log(res.data);
					var ok = 0;
	                for(var i =0 ; i<$scope.products.length;i++)
	                {
						if ($scope.products[i].name == res.data.name){
							ok = i ;
							break;
						}
	                }
	                console.log(ok);
					angular.forEach(res.data.item, function(value, key) {
						$scope.productNames.push($scope.itemListName[value.productID]);
						console.log(value.qty_init);
						console.log($scope.withdraw[ok][value.productID]);
						console.log($scope.deposit[ok][value.productID]);
						var sum = value.qty_init-$scope.withdraw[ok][value.productID]+$scope.deposit[ok][value.productID];
						console.log(sum);
						$scope.qtyinstock.push(sum);
					});
					
					loadChart($scope.productNames, $scope.qtyinstock);
				})
				.catch(function(res){
					console.log("Error" + res)
				})				
			 }

			 function loadChart(productNames, qtySold){					;
					$scope.loadChart = function(productNames, qtySold){
					productNames =$scope.productNames;
					qtySold = $scope.qtyinstock;					
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
								label: '# of qty_in_stock',
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
					if(!alert("Create Success")){window.location.reload();} 
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
				//$scope.data.item.push($scope.item);
				// console.log($scope.item)
				//console.log($scope.data)
				var check = true;
				for(var i = 0; i<$scope.data.item.length;i++)
				{
					if($scope.data.item[i].productID == $scope.item.productID)
					{
						check = false;
						var transaction = {
							shop: $scope.data.name,
							item: {
								productID: $scope.item.productID,
								quantity: $scope.item.qty_init
							},
							type: "deposit"

						}
						$http.post('/api/order/',transaction)
						.then(function(res){
							if(!alert("Add Success")){window.location.reload();} 
						})
						break;
					}
				}
				if(check)
				{
					$http.put('/api/productnew/'+id,$scope.item)
				.then(function(res){
					$scope.abc = res.data;
					if(!alert("Add Success")){window.location.reload();} 
				})
				.catch(function(res){
					//console.log(res.data);
					console.log("Error" + res)
				})

				}
				$window.alert(angularAlert);
				
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
				$http.put('/api/product/'+shopID,data)
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
				//console.log("hello"+data1)
				$http.get('/api/product/'+data1)
				.then(function(res){
					$scope.data = res.data;
					//console.log(res.data);
					//console.log(data1);
				})
				.catch(function(res){
					//console.log(res.data);
					console.log("Error" + res)
				})
			}
})



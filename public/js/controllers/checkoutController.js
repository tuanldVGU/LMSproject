angular.module('checkoutController', [])
	.controller('mainController',function($scope, $http){
		$scope.data = [];
        $scope.item = {};
        $scope.item_id = 0;
        $scope.item_qty = 1;
        $scope.subTotal = 0;
        $scope.Total = 0;
        $scope.Tax = 0;
        $scope.promotion = 0;
        $scope.shopName = "";
        $scope.employee = "";
        $scope.orderList = {};
        $scope.orderListPaid = {};
        $scope.orderListPaid.item = [];
        $scope.items = [];
        // $scope.orderList.item=[];
        // show all the products
        $scope.init = function(s1) {
            $scope.shopName = s1;
            $http.get('/api/items')
            .then(function(res){
                $scope.items = res.data;
            })
            $http.get('/api/product/'+$scope.shopName)
			.then(function(res){
/*				console.log(res.data[0].shop1);
				console.log('x');*/
                
                $scope.orderList = res.data;
                console.log($scope.orderList)
                // $scope.orderList.name = res.data.name;
                // $scope.orderList._id = res.data._id;

			})
			.catch(function(res){
				//Export error
                console.log('Error: ' + res);
                console.log($scope.shopName);
			})
			$scope.addFunc = function(){
                //console.log($scope.item)
                //$scope.promotion = document.getElementById('promotion').value;
                $scope.item_id = document.getElementById("item_id").value;
                for(var i=0; i<$scope.orderList.item.length;i++) 
                {
                    //console.log($scope.item_id,i,$scope.orderList.item[i].productID)

                    if($scope.orderList.item[i].productID == $scope.item_id)
                    {
                       
                        for(var j =0 ; j<$scope.items.length;j++)
                        {
                            if($scope.items[j].productID == $scope.item_id)
                            {
                                $scope.data.push({"id":i,"productID":$scope.item_id,"productName":$scope.items[j].productName,"price":$scope.items[j].price,"quantity": $scope.item_qty});
                                $scope.subTotal = $scope.subTotal + $scope.items[j].price * $scope.item_qty;
                                $scope.Tax = $scope.subTotal *0.1;
                                $scope.Total = $scope.subTotal + $scope.Tax -$scope.promotion*$scope.subTotal;
                                var testPro = {};
                                testPro.productID = $scope.items[j].productID;
                                testPro.quantity = $scope.item_qty;
                                $scope.orderListPaid.item.push(testPro);
                                break;
                            }
                        }
                        
                    }
                    
                }
                console.log($scope.orderListPaid);

            }
            $scope.promFunc = function(promotion){
                $scope.promotion = promotion;
                $scope.Total = $scope.subTotal + $scope.Tax -$scope.promotion*$scope.subTotal;
            }
            $scope.payFunc = function(id){
                $scope.orderListPaid.promotion = $scope.promotion;
                $scope.orderListPaid.shop = $scope.shopName;
                $scope.orderListPaid.type = "withdraw";
                $http.post('/api/order/',$scope.orderListPaid)
                .then(function(res){

                })
                // $scope.subTotal = 0;
                // $scope.tax = 0;
                // $scope.Total = 0;
                // $scope.promotion = 0;
                // $scope.data = [];
                // $scope.item_qty = 1;
                if(!alert("Pay Success")){window.location.reload();} 
            }

        }
        
			
		


	})



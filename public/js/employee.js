var sub_total=0;
var promotion=0;
var input = document.getElementById("voucherInput");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("voucherCloseBtn").click();
    }
})

function promFunc(value) {
	document.getElementById("promotion").innerHTML = value+"%";
	promotion = value;
	document.getElementById("tax").innerHTML = sub_total*(100-promotion)/100 * 0.1;
}

function voucherFunct() {
	document.getElementById("promotion").innerHTML = document.getElementById("voucherInput").value;
}


function addFunc() {	  
	var table = document.getElementById("salesTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);	
	
	/*if (document.getElementById("quantity").value == null) 
		document.getElementById("quantity").value = 5;	
	
	do {
		var quantity = document.getElementById("quantity").value;	
	} while (quantity == null);
	var initData = JSON.parse("<%-JSON.stringify(item)%>");
	var datagood = $.grep(initData, function (item) {
    	return item.productID == document.getElementById("item_id").value;
	});
  
	cell1.innerHTML = "a";
	cell2.innerHTML = document.getElementById("item_id").value;
	cell3.innerHTML = datagood[0].productName;
	cell4.innerHTML = document.getElementById("quantity").value;
	cell5.innerHTML = datagood[0].price;*/

	cell1.innerHTML = "Just for testing";
	cell2.innerHTML = "2";
	cell3.innerHTML = "3";
	cell4.innerHTML = "4";
	cell5.innerHTML = "5";
	var price =5;
	sub_total = sub_total +  price*quantity;
	document.getElementById("sub_total").innerHTML = sub_total;
	document.getElementById("tax").innerHTML = sub_total*(100-promotion)/100 * 0.1;
	document.getElementById("sum").innerHTML = sub_total*(100-promotion)/100 * 0.9;	
}

function payFunc() {
	document.getElementById("pay_modal_value").innerHTML = "Total: "+ sub_total*(100-promotion)/100 * 0.9;
	// console.log(document.getElementById("my_modal_value").value);
	// $("#payModal").find('.p').val('xxx');
	$("#payModal").modal("show");

	// window.alert("Total: "+ sub_total*(100-promotion)/100 * 0.9);
	// No need when page reload
	/*myTable = document.getElementById("salesTable");
	var rowCount = myTable.rows.length; while(--rowCount) myTable.deleteRow(rowCount);
	document.getElementById("sub_total").innerHTML = 0;
	document.getElementById("tax").innerHTML = 0;
	document.getElementById("sum").innerHTML = 0;
	document.getElementById("promotion").innerHTML = 0;*/
}

var del = document.getElementById("closePayBtn");
del.addEventListener('click', function () {
  fetch('employee', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log("hello "+data)
    window.location.reload()
  })
})
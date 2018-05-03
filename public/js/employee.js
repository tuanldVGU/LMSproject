var data = document.getElementById('yy').value
var sub_total=0;
var promotion=0;

function promFunc(value) {
	document.getElementById("promotion").innerHTML = value+"%";
	promotion = value;
	document.getElementById("tax").innerHTML = sub_total*(100-promotion)/100 * 0.1;
}

function voucherFunct() {
	document.getElementById("promotion").innerHTML = document.getElementById("voucherInput").value;
}

var input = document.getElementById("voucherInput");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("voucherCloseBtn").click();
    }
});
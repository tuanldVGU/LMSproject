var textBoxes=document.getElementsByTagName("input");
for(var i=0;i<textBoxes.length;i++){
    if(textBoxes[i].type!="button")
        textBoxes[i].value="";
}

var rowID=1;
var tableProduct=document.getElementById("table").getElementsByTagName('tbody')[0];
function addRow(){		
    var newRow=tableProduct.insertRow(tableProduct.rows.length);
    newRow.id= document.getElementById("productID").value;
    var newCell1=newRow.insertCell(0)
    var newCell2=newRow.insertCell(1);
    var newCell3=newRow.insertCell(2);
    var newCell4=newRow.insertCell(3);
    newCell1.innerHTML=tableProduct.rows.length - 1;
    newCell2.innerHTML=document.getElementById("productName").value;
    
    var barcodeImage=new Image();
    JsBarcode(barcodeImage, document.getElementById("productID").value,{
        format: document.getElementById("selection").value
    });		
    newCell3.appendChild(barcodeImage);
    
    newCell4.innerHTML=document.getElementById("selection").value.toUpperCase();

    rowID++;
}

function deleteRow(){
    var rowNumber=document.getElementById("rowID");
    if(rowNumber.value!="0")
        tableProduct.deleteRow(rowNumber.value);
    checkRowID();
}

function clearAll(){
    if(tableProduct.rows.length>1){
        var confirmValue=confirm("Do you want to delete all product data from the table?");
        if(confirmValue==true){
            while(tableProduct.rows.length>1)
                tableProduct.deleteRow(1);
        }
    }
}

function checkRowID(){
    var newRowNumber=1;
    for(var i=1;i<tableProduct.rows.length;i++){
        tableProduct.rows[i].cells[0].innerHTML=newRowNumber;
        newRowNumber++;
    }
}

function downloadCsv(csv,filename) {
    var csvFile;
    var downloadLink;
    
    csvFile=new Blob([csv],{type: "text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function exportToCsv(tableObj,filename) {
    var csv=[];
    var rows=document.querySelectorAll("table tr");
    
    for(var i=0;i<rows.length;i++){
        var row=[],cols=rows[i].querySelectorAll("td, th");			
        for (var j=0;j<cols.length;j++){
            if(j!=2 && i!=0)
                row.push(cols[j].innerText);
            else if(j==2 && i!=0)
                row.push(rows[i].id);
            else
                row.push(cols[j].innerText);
        }
        csv.push(row.join(","));		
    }
    downloadCsv(csv.join("\n"), filename);
}

document.getElementById("tableDownload").addEventListener("click",function () {
    var tableObj=document.querySelector("table").outerHTML;
    exportToCsv(tableObj,"productTable.csv");
});
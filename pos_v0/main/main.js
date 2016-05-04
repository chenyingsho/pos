//TODO: Please write code in this file.
function printReceipt(inputs) {
  var result='';

  result="***<没钱赚商店>收据***\n";
  for(var i=0;i<inputs.length;i++){
    var total=1;
    total=inputs[i].price*inputs[i].count;
    result+="名称："+inputs[i].name+"，数量："+inputs[i].count+inputs[i].unit+"，单价："+inputs[i].price.toFixed(2)+"(元)，小计："+total.toFixed(2)+"(元)\n";
  }
  result+="----------------------\n";
  var totalprice=0;
  for(var j=0;j<inputs.length;j++) {

    totalprice+=inputs[j].price*inputs[j].count;
  }
  result+="总计：" +totalprice.toFixed(2)+"(元)\n";
  result+="**********************";
  console.log(result);
}

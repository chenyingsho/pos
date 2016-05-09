//TODO: Please write code in this file.
function printReceipt(inputs) {
  //将统计之后的结果放进temp数组中
  var temp=[];
  for(var i=0;i<inputs.length;i++){
    var exist=find(inputs[i].barcode,temp);
    if(exist){
      exist.count++;
    }
    else{
      temp.push({name:inputs[i].name,count:1,unit:inputs[i].unit,price:inputs[i].price,barcode:inputs[i].barcode});
    }
  }
  //遍历temp数组将结果打印出来
  var result='';
  result="***<没钱赚商店>收据***\n";
  for(var i=0;i<temp.length;i++){
    var total=1;
    total=temp[i].price*temp[i].count;
    result+="名称："+temp[i].name+"，数量："+temp[i].count+temp[i].unit+"，单价："+temp[i].price.toFixed(2)+"(元)，小计："+total.toFixed(2)+"(元)\n";
  }
  result+="----------------------\n";
  var totalprice=0;
  for(var j=0;j<temp.length;j++) {
    totalprice+=temp[j].price*temp[j].count;
  }
  result+="总计：" +totalprice.toFixed(2)+"(元)\n";
  result+="**********************";
  console.log(result);
}
function find(elem,temp) {   //判断此元素是否在temp数组中存在
  var temp1;
  for(var i=0;i<temp.length;i++){
    if(elem===temp[i].barcode){
      temp1=temp[i];
    }
  }
  return temp1;
}


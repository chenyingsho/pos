function printReceipt(inputs) {

  var NewItem = BuildNewItem(inputs);
  var TotalPrice = GetTotalPrice(NewItem);
  var LastResult = GetNewString(TotalPrice);
  console.log(LastResult);
}

function BuildNewItem(inputs) {
  var item = [];

  for (var i = 0; i < inputs.length; i++) {
    var subtotal = inputs[i].price * inputs[i].count;
    item.push({inputs: inputs[i], subtotal: subtotal});
  }

  return item;
}

function GetTotalPrice(item) {
  var TotalItem;
  var total = 0;

  for (var i = 0; i < item.length; i++)
    total = total + item[i].subtotal;
  TotalItem = {cart: item, total: total};

  return TotalItem;
}

function GetNewString(TotalItem) {
  var result = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < TotalItem.cart.length; i++) {
    result += "名称：" + TotalItem.cart[i].inputs.name + "，数量：" +
      TotalItem.cart[i].inputs.count + TotalItem.cart[i].inputs.unit
      + "，单价：" + TotalItem.cart[i].inputs.price.toFixed(2) + "(元)，小计：" +
      TotalItem.cart[i].subtotal.toFixed(2) + "(元)\n";
  }
  result += "----------------------\n";
  result += "总计：" + TotalItem.total.toFixed(2) + "(元)\n";
  result += "**********************";

  return result;
}

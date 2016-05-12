function printReceipt(inputs) {

  var newItem = buildNewItem(inputs);
  var totalPrice = getTotalPrice(newItem);
  var lastResult = getNewString(totalPrice);
  console.log(lastResult);
}

function buildNewItem(inputs) {
  var item = [];

  for (var i = 0; i < inputs.length; i++) {
    var subtotal = inputs[i].price * inputs[i].count;
    item.push({inputs: inputs[i], subtotal: subtotal});
  }

  return item;
}

function getTotalPrice(item) {
  var totalItem;
  var total = 0;

  for (var i = 0; i < item.length; i++)
    total = total + item[i].subtotal;
  totalItem = {cart: item, total: total};

  return totalItem;
}

function getNewString(totalItem) {
  var result = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < totalItem.cart.length; i++) {
    result += "名称：" + totalItem.cart[i].inputs.name + "，数量：" +
      totalItem.cart[i].inputs.count + totalItem.cart[i].inputs.unit
      + "，单价：" + totalItem.cart[i].inputs.price.toFixed(2) + "(元)，小计：" +
      totalItem.cart[i].subtotal.toFixed(2) + "(元)\n";
  }
  result += "----------------------\n";
  result += "总计：" + totalItem.total.toFixed(2) + "(元)\n";
  result += "**********************";

  return result;
}

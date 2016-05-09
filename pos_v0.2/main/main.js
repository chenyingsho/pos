function printReceipt(inputs) {

  var statistics = getStatistics(inputs);
  var newItem = buildNewItem(statistics);
  var totalPrice = getTotalPrice(newItem);
  var lastResult = getNewString(totalPrice);
  console.log(lastResult);

}

function getStatistics(inputs) {
  var countItem=[];
  var list=loadAllItems();

  for(var i=0;i<inputs.length;i++){
    var exist=findExist(inputs[i],countItem);
    if(exist){
      exist.count++;
    }
    else {
      for(var j=0;j<list.length;j++){
        if(inputs[i]===list[j].barcode)
          countItem.push({Item:list[j],count:1});
      }
    }
  }

  return countItem;
}

function findExist(elem,countItem) {
  var existTemp;

  for (var i = 0; i < countItem.length; i++) {
    if (elem === countItem[i].Item.barcode) {
      existTemp = countItem[i];
    }
  }

  return existTemp;
}

function buildNewItem(countItem) {
  var cart = [];

  for (var i = 0; i < countItem.length; i++) {
    var subtotal = countItem[i].Item.price * countItem[i].count;
    cart.push({countItem: countItem[i], subtotal: subtotal});
  }

  return cart;
}

function getTotalPrice(cart) {
  var totalItem;
  var total = 0;

  for (var i = 0; i < cart.length; i++)
    total = total + cart[i].subtotal;
  totalItem = {cart: cart, total: total};

  return totalItem;
}

function getNewString(totalItem) {
  var result = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < totalItem.cart.length; i++) {
    result += "名称：" + totalItem.cart[i].countItem.Item.name + "，数量：" +
      totalItem.cart[i].countItem.count + totalItem.cart[i].countItem.Item.unit
      + "，单价：" + totalItem.cart[i].countItem.Item.price.toFixed(2) + "(元)，小计：" +
      totalItem.cart[i].subtotal.toFixed(2) + "(元)\n";
  }
  result += "----------------------\n";
  result += "总计：" + totalItem.total.toFixed(2) + "(元)\n";
  result += "**********************";

  return result;
}


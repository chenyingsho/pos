function printReceipt(inputs) {

  var statistics = GetStatistics(inputs);
  var NewItem = BuildNewItem(statistics);
  var TotalPrice = GetTotalPrice(NewItem);
  var LastResult = GetNewString(TotalPrice);
  console.log(LastResult);

}

function GetStatistics(inputs) {
  var CountItem = [];

  for (var i = 0; i < inputs.length; i++) {
    var exist = FindExist(inputs[i].barcode, CountItem);
    if (exist) {
      exist.count++;
    }
    else {
      CountItem.push({Item: inputs[i], count: 1})
    }
  }

  return CountItem;
}

function FindExist(elem, CountItem) {
  var ExistTemp;

  for (var i = 0; i < CountItem.length; i++) {
    if (elem === CountItem[i].Item.barcode) {
      ExistTemp = CountItem[i];
    }
  }

  return ExistTemp;
}

function BuildNewItem(CountItem) {
  var cart = [];

  for (var i = 0; i < CountItem.length; i++) {
    var subtotal = CountItem[i].Item.price * CountItem[i].count;
    cart.push({CountItem: CountItem[i], subtotal: subtotal});
  }

  return cart;
}

function GetTotalPrice(cart) {
  var TotalItem;
  var total = 0;

  for (var i = 0; i < cart.length; i++)
    total = total + cart[i].subtotal;
  TotalItem = {cart: cart, total: total};

  return TotalItem;
}

function GetNewString(TotalItem) {
  var result = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < TotalItem.cart.length; i++) {
    result += "名称：" + TotalItem.cart[i].CountItem.Item.name + "，数量：" +
      TotalItem.cart[i].CountItem.count + TotalItem.cart[i].CountItem.Item.unit
      + "，单价：" + TotalItem.cart[i].CountItem.Item.price.toFixed(2) + "(元)，小计：" +
      TotalItem.cart[i].subtotal.toFixed(2) + "(元)\n";
  }
  result += "----------------------\n";
  result += "总计：" + TotalItem.total.toFixed(2) + "(元)\n";
  result += "**********************";

  return result;
}


function printReceipt(inputs) {

  var statistics = getStatistics(inputs);
  var newItem = buildNewItem(statistics);
  var totalPrice = getTotalPrice(newItem);
  var totalPromotionPrice = getPromotion(totalPrice);
  var result = getNewString(totalPromotionPrice);
  console.log(result);

}

function getStatistics(inputs) {
  var countItem = [];
  var list = loadAllItems();

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].charAt(10) === '-') {
      for (var j = 0; j < list.length; j++) {
        if (inputs[i].slice(0, 10) === list[j].barcode) {
          countItem.push({Item: list[j], count: inputs[i].slice(11)});
        }
      }
    }
    else {
      var exist = findExist(inputs[i], countItem);
      if (exist) {
        exist.count++;
      }
      else {
        for (var existCount = 0; existCount < list.length; existCount++) {
          if (inputs[i] === list[existCount].barcode)
            countItem.push({Item: list[existCount], count: 1});
        }
      }
    }
  }

  return countItem;
}

function findExist(elem, countItem) {
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

function getPromotion(totalItem) {
  var totalPromotion = 0;
  var finalTotalItem;
  var promotionList = loadPromotions();

  for(var i=0;i<totalItem.cart.length;i++){
    for(var j=0;j<promotionList[0].barcodes.length;j++){
      if(totalItem.cart[i].countItem.Item.barcode===promotionList[0].barcodes[j]){
          var promotionItem = parseInt(totalItem.cart[i].countItem.count/3);
          var promotionPrice = promotionItem * totalItem.cart[i].countItem.Item.price;
          totalItem.cart[i].subtotal -= promotionPrice;
          totalPromotion += promotionPrice;
      }
    }
  }
  finalTotalItem = {totalItem:totalItem,totalPromotion:totalPromotion};

  return finalTotalItem;
}

function getNewString(finalTotalItem) {
  var totalPromotionPrice = 0;
  var result = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < finalTotalItem.totalItem.cart.length; i++) {
    result += "名称：" + finalTotalItem.totalItem.cart[i].countItem.Item.name + "，数量：" +
      finalTotalItem.totalItem.cart[i].countItem.count + finalTotalItem.totalItem.cart[i].countItem.Item.unit
      + "，单价：" + finalTotalItem.totalItem.cart[i].countItem.Item.price.toFixed(2) + "(元)，小计：" +
      finalTotalItem.totalItem.cart[i].subtotal.toFixed(2) + "(元)\n";
  }
  result += "----------------------\n";
  totalPromotionPrice = finalTotalItem.totalItem.total - finalTotalItem.totalPromotion;
  result += "总计：" + totalPromotionPrice.toFixed(2) + "(元)\n";
  result += "节省：" + finalTotalItem.totalPromotion.toFixed(2) + "(元)\n";
  result += "**********************";

  return result;
}

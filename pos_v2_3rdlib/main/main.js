function printReceipt(inputs) {

  var statistics = GetStatistics(inputs);
  var NewItem = BuildNewItem(statistics);
  var TotalPrice = GetTotalPrice(NewItem);
  var TotalPromotionPrice = GetPromotion(TotalPrice);
  var result = GetNewString(TotalPromotionPrice);
  console.log(result);

}

function GetStatistics(inputs) {
  var CountItem = [];
  var list = loadAllItems();

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].charAt(10) === '-') {
      for (var j = 0; j < list.length; j++) {
        if (inputs[i].slice(0, 10) === list[j].barcode) {
          CountItem.push({Item: list[j], count: inputs[i].slice(11)});
        }
      }
    }
    else {
      var exist = FindExist(inputs[i], CountItem);
      if (exist) {
        exist.count++;
      }
      else {
        for (var ExistCount = 0; ExistCount < list.length; ExistCount++) {
          if (inputs[i] === list[ExistCount].barcode)
            CountItem.push({Item: list[ExistCount], count: 1});
        }
      }
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

  for (var i = 0; i < cart.length; i++) {
    total = total + cart[i].subtotal;
  }
  TotalItem = {cart: cart, total: total};

  return TotalItem;
}

function GetPromotion(TotalItem) {
  var TotalPromotion = 0;
  var FinalTotalItem;
  var PromotionList = loadPromotions();

  for (var i = 0; i < TotalItem.cart.length; i++) {
    for (var j = 0; j < PromotionList[0].barcodes.length; j++) {
      if (TotalItem.cart[i].CountItem.Item.barcode === PromotionList[0].barcodes[j]) {
        var PromotionItem = parseInt(TotalItem.cart[i].CountItem.count / 3);
        var PromotionPrice = PromotionItem * TotalItem.cart[i].CountItem.Item.price;
        TotalItem.cart[i].subtotal -= PromotionPrice;
        TotalPromotion += PromotionPrice;
      }
    }
  }
  FinalTotalItem = {TotalItem: TotalItem, TotalPromotion: TotalPromotion};

  return FinalTotalItem;
}

function GetTime() {
  var MyDate = new Date();
  var month = MyDate.getMonth() + 1;
  var day = MyDate.getDate();
  var seconds = MyDate.getSeconds();

  if (month < 10) {
    var StrMonth = '0' + month;
  }

  if (seconds < 10) {
    var StrSeconds = '0' + seconds;
  }
  else {
    StrSeconds = seconds;
  }


  var time = MyDate.getFullYear() + '年' + StrMonth + '月' + day + '日 ' + MyDate.getHours() + ':' +
    MyDate.getMinutes() + ':' + seconds;

  return time;
}

function GetNewString(FinalTotalItem) {
  var TotalPromotionPrice = 0;
  var result = "***<没钱赚商店>收据***\n";
  var DateInTime = GetTime();

  result += "打印时间：" + DateInTime + '\n';
  result += '----------------------\n';
  for (var i = 0; i < FinalTotalItem.TotalItem.cart.length; i++) {
    result += "名称：" + FinalTotalItem.TotalItem.cart[i].CountItem.Item.name + "，数量：" +
      FinalTotalItem.TotalItem.cart[i].CountItem.count + FinalTotalItem.TotalItem.cart[i].CountItem.Item.unit
      + "，单价：" + FinalTotalItem.TotalItem.cart[i].CountItem.Item.price.toFixed(2) + "(元)，小计：" +
      FinalTotalItem.TotalItem.cart[i].subtotal.toFixed(2) + "(元)\n";
  }
  result += "----------------------\n";
  TotalPromotionPrice = FinalTotalItem.TotalItem.total - FinalTotalItem.TotalPromotion;
  result += "总计：" + TotalPromotionPrice.toFixed(2) + "(元)\n";
  result += "节省：" + FinalTotalItem.TotalPromotion.toFixed(2) + "(元)\n";
  result += "**********************";

  return result;
}

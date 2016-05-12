describe('pos', function () {
  var allItems;
  var inputs;

  beforeEach(function () {
    allItems = loadAllItems();
    inputs = [
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000001',
      'ITEM000001',
      'ITEM000004'
    ];
  });

  it('should print correct text', function () {

    spyOn(console, 'log');

    printReceipt(inputs);

    var expectText =
      '***<没钱赚商店>收据***\n' +
      '名称：可口可乐，数量：5瓶，单价：3.00(元)，小计：15.00(元)\n' +
      '名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)\n' +
      '名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)\n' +
      '----------------------\n' +
      '总计：23.00(元)\n' +
      '**********************';

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});

describe('getStatistics', function () {
  var inputs;

  beforeEach(function () {
    inputs = [
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000001',
      'ITEM000001',
      'ITEM000004'
    ];
  });

  it('should print getStatistics', function () {


    var newGetStatistics = getStatistics(inputs);
    var newCountItem = [{
      item: {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00,
      },
      count: 5
    },
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00,
        },
        count: 2
      },
      {
        item: {
          barcode: 'ITEM000004',
          name: '电池',
          unit: '个',
          price: 2.00,
        },
        count: 1
      }];

    expect(newGetStatistics).toEqual(newCountItem);
  });
});

describe('buildNewItem', function () {
  var inputs;

  beforeEach(function () {
    inputs = [{
      item: {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00,
      },
      count: 5
    },
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00,
        },
        count: 2
      },
      {
        item: {
          barcode: 'ITEM000004',
          name: '电池',
          unit: '个',
          price: 2.00,
        },
        count: 1
      }];
  });

  it('should print buildNewItem', function () {


    var newBuildNewItem = buildNewItem(inputs);
    var newCart = [{
      countItem: {
        item: {
          barcode: 'ITEM000000',
          name: '可口可乐',
          unit: '瓶',
          price: 3.00,
        },
        count: 5
      },
      subtotal: 15
    },
      {
        countItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
          },
          count: 2
        },
        subtotal: 6
      },
      {
        countItem: {
          item: {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00,
          },
          count: 1
        },
        subtotal: 2
      }];

    expect(newBuildNewItem).toEqual(newCart);
  });
});

describe('getTotalPrice', function () {
  var inputs;

  beforeEach(function () {
    inputs = [{
      countItem: {
        item: {
          barcode: 'ITEM000000',
          name: '可口可乐',
          unit: '瓶',
          price: 3.00,
        },
        count: 5
      },
      subtotal: 15
    },
      {
        countItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
          },
          count: 2
        },
        subtotal: 6
      },
      {
        countItem: {
          item: {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00,
          },
          count: 1
        },
        subtotal: 2
      }];
  });

  it('should print getTotalPrice', function () {


    var newGetTotalPrice = getTotalPrice(inputs);
    var newTotalItem =
    {
      cart: [{
        countItem: {
          item: {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
          },
          count: 5
        },
        subtotal: 15
      },
        {
          countItem: {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00,
            },
            count: 2
          },
          subtotal: 6
        },

        {
          countItem: {
            item: {
              barcode: 'ITEM000004',
              name: '电池',
              unit: '个',
              price: 2.00,
            },
            count: 1
          },
          subtotal: 2
        }
      ],
      total: 23.00

    };

    expect(newGetTotalPrice).toEqual(newTotalItem);
  });
});


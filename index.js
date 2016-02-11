// H A S H   C O D E   2 0 1 6

var lineReader = require('line-reader');
var warehouseService = require('./warehouse');
var productService = require('./products');
var orderService = require('./orders');

main(process.argv[2], process.argv[3]);

function main(inputFile, outputFile) {
  var data = {};
  var i = 0;
  var warehouseNb = -1;
  var ordersNb = -1;
  var ordersNbIndex = -1;
  lineReader.eachLine(inputFile, function(line, last) {
    var split = line.split(' ');
    var labels = [];
    if (i === 0) {
      // rows columns drones turns maxpayload
      labels = ('rows columns drones turns maxpayload').split(' ');
      if (split.length !== labels.length) {
        throw new Error('Bad input file. Line:', i);
      }
      labels.forEach(function (label, index) {
        data[label] = split[index];
      });
    } else if (i === 1) {
      // products number
      data.products = {};
    } else if (i === 2) {
      // products weigh
      split.forEach(function (product, index) {
        productService.add(index, product);
        data.products[index] = product;
      });
    } else if (warehouseNb < 0) {
      // warehouses number
      warehouseNb = parseInt(split[0]);
      data.warehouses = {};
    } else if (i < 3 + warehouseNb * 2 + 1) {
      // warehouses
      if (split.length == 2) {
        warehouseService.add(Object.keys(data.warehouses).length, split[0], split[1]);
        data.warehouses[Object.keys(data.warehouses).length] = {
          x: split[0],
          y: split[1]
        };
      } else if (split.length === Object.keys(data.products).length) {
        data.warehouses[Object.keys(data.warehouses).length - 1].products = {};
        split.forEach(function (count, index) {
          warehouseService.addProduct(Object.keys(data.warehouses).length - 1, index, count);
          data.warehouses[Object.keys(data.warehouses).length - 1].products[index] = count;
        });
      } else {
        throw new Error('Bad input file. Line:', i);
      }
    } else if (ordersNb < 0) {
      // orders number
      ordersNb = parseInt(split[0]);
      ordersNbIndex = i;
      data.orders = {};
    } else {
      // orders
      if ((i - ordersNbIndex) % 3 === 1) {
        // x y
        orderService.add(split[0], split[1]);
        data.orders[Object.keys(data.orders).length] = {
          x: split[0],
          y: split[1],
          count: -1,
          products: {}
        };
      } else if ((i - ordersNbIndex) % 3 === 2) {
        // products number
        data.orders[Object.keys(data.orders).length - 1].count = split[0];
      } else if ((i - ordersNbIndex) % 3 === 0) {
        // products type
        split.forEach(function (productType) {
          if (typeof data.orders[Object.keys(data.orders).length - 1].products[productType] == 'undefined') {
            data.orders[Object.keys(data.orders).length - 1].products[productType] = 0;
          }
          orderService.addProduct(Object.keys(data.orders).length - 1, productType, 1);
          data.orders[Object.keys(data.orders).length - 1].products[productType]++;
        });
      }
    }
    ++i;
  }).then(function () {
    console.log(JSON.stringify(data, null, 2));
  });
}
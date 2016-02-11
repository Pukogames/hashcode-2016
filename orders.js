/*
 * var e = require('./orders');
 */
var orders = [];
var products = require('./products');

module.exports = {
  add: function(x, y) {
    orders.push({ x: x, y: y, products: {}});
  },
  count: function() {
    return orders.length;
  },
  addProduct: function(id, productId, count) {
    orders[id].products[productId] = (orders[id].products[productId] || 0) + count;
  },
  deliver: function(id, productId, count) {
    orders[id].products[productId] -= count;
  },
  get: function(id) {
    return orders[id];
  },
  getWeight: function(id) {
    var pKeys = Object.keys(orders[id].products);
    var weight = 0;
    for(var i = 0; i < pKeys.length; i++) {
      weight += products.getWeight(pKeys[i]) * orders[id].products[pKeys[i]];
    }
    return weight;
  },
  getItemsUntilWeight: function(id, _weight) {
    var pKeys = Object.keys(orders[id].products);
    var weight = 0;

    var rValue = {};

    for(var i = 0; i < pKeys.length && weight <= _weight; i++) {
      for(var j = 0; j < orders[id].products[pKeys[i]] && weight <= _weight; j++) {
        weight += products.getWeight(pKeys[i]);
        rValue[pKeys[i]]++;
      }
    }

    return rValue;
  },
  getProductCount: function(id) {
    return Object.keys(orders[id].products).length;
  }
};

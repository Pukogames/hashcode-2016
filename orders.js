/*
 * var e = require('./orders');
 */
var orders = [];
var products = require('./products');

module.exports = {
  add: function(x, y) {
    orders.push({ id: orders.length, x: x, y: y, products: {}});
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
  getNextProduct: function(id) {
    var pKeys = Object.keys(orders[id].products);
    for(var i = 0; i < pKeys.length; i++) {
      if (orders[id].products[pKeys[i]] > 0) {
        orders[id].products[pKeys[i]]--;
        return pKeys[i];
      }
    }

    return false;
  },
  getProductCount: function(id) {
    var pKeys = Object.keys(orders[id].products);
    var pCount = 0;
    for(var i = 0; i < pKeys.length; i++) {
      if (orders[id].products[pKeys[i]] > 0) {
        pCount += orders[id].products[pKeys[i]];
      }
    }
    return pCount;
  }
};

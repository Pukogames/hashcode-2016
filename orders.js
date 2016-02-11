/*
 * var e = require('./orders');
 */
var orders = [];
var products = require('./products');

module.exports = {
  add: function(x, y) {
    orders.push({ x: x, y: y, products: {}});
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
      weight += products.getWeight(pKeys[i]);
    }
    return weight;
  },
  getProductCount: function(id) {
    return Object.keys(orders[id].products).length;
  }
};

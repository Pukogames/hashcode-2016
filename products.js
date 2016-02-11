/*
 * var e = require('./products');
 * e.add(id, weight)
 * e.getWeight()
 */
var products = {};

module.exports = {
  add: function(id, weight) {
    products[id] = weight;
  },
  getWeight: function(id) {
    return products[id];
  }
};

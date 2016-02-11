/*
 * var e = require('./products');
 * e.append(id, weight)
 * e.getWeight(id)
 */
var products = {};

module.exports = {
  append: function(id, weight) {
    products[id] = weight;
  },
  getWeight: function(id) {
    return products[id];
  }
};

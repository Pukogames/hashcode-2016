/*
 * var e = require('./warehouse');
 * e.add(id, x, y) //add a warehouse
 * e.count() //get warehouse count
 * e.addProduct(warehouseId, productId, count) //add count product to warehouseId warehouse
 * e.get(id) //get a warehouse
 * e.get(id).products[productId] //get product quantity for given warehouse
 */
var warehouses = [];

module.exports = {
  count: function() {
    return warehouses.length;
  },
  add: function (id, x, y) {
    warehouses[id] = {
      id: id,
      x: x, 
      y: y, 
      products: {}
    };
  },
  addProduct: function(id, productId, count) {
    warehouses[id].products[productId] = count;
  },
  get: function(id) {
    return warehouses[id];
  },
  getWarehouseProduct: function (productId) {
    for(var i = 0; i < warehouses.length; i++) {
      if (warehouses[i].products[productId] > 0) {
        return warehouses[i];
      }
    }
  },
  removeProduct: function(id, productId) {
    warehouses[i].products[productId]--;
  }
};

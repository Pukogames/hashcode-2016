var drones = require('./drones'),
  warehouses = require('./warehouse'),
  products = require('./products'),
  orders = require('./orders');

module.exports = function(rows, columns, startingWarehouseId, dronesCount, dronesCapacity, turns) {
  for(var i = 0; i < dronesCount; i++) {
    drones.add(i, warehouses.get(startingWarehouseId), turns, dronesCapacity);
  }

};

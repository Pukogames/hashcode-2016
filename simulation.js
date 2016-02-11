var drones = require('./drone'),
  warehouses = require('./warehouse'),
  products = require('./products'),
  orders = require('./orders');

module.exports = function(rows, columns, dronesCount, dronesCapacity, turns) {
  for (var i = 0; i < dronesCount; i++) {
    drones.add(i, warehouses.get(0), turns, dronesCapacity);
  }

  var drone = drones.get(0);
  var order = orders.get(0);
  var productType = -1;
  var warehouse = null;

  for(var droneId = 0; droneId < dronesCount; droneId++) {
    for (var orderId = 0; orderId < orders.count(); orderId++) {
      productType = orders.getNextProduct(orderId);
      warehouse = warehouses.getWarehouseProduct(productType);
      if (warehouse && typeof warehouse == 'object') {
        drones.move(droneId, warehouses.getWarehouseProduct(productType))
      }
    }
  }
};

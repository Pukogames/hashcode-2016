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

  for (var orderId = 0; orderId < orders.count(); orderId++) {
    for(var droneId = 0; droneId < dronesCount; droneId++) {
      productType = orders.getNextProduct(orderId);
      warehouse = warehouses.getWarehouseProduct(productType);
      if (warehouse && typeof warehouse == 'object') {
        drones.load(droneId, warehouses.getWarehouseProduct(productType), productType, 1);
        drones.unload(droneId, orders.get(orderId), productType, 1);
      }
    }
  }
};

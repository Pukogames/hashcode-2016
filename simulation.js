var drones = require('./drones');

module.exports = function(rows, columns, warehouses, startingWarehouseId, dronesCount, dronesCapacity, turns) {
  for(var i = 0; i < dronesCount; i++) {
    drones.add(i, warehouses.get(startingWarehouseId), turns, dronesCapacity);
  }
};

var drones = require('./drone'),
  warehouses = require('./warehouse'),
  products = require('./products'),
  orders = require('./orders');

module.exports = function(rows, columns, dronesCount, dronesCapacity, turns) {
  for (var i = 0; i < dronesCount; i++) {
    drones.add(i, warehouses.get(0), turns, dronesCapacity);
  }

  for(var i = 0; i < dronesCount; i++) {
    for (var j = 0; j < orders.count(); j++) {
      
    }
  }
};

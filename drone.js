var drones = [];
var poducts = require('./products');

function euclidean(p1, p2) {
  var deltaX = Math.pow(p1.x - p2.x, 2),
      deltaY = Math.pow(p1.y - p2.y, 2);

  return Math.floor(Math.sqrt(deltaX + deltaY));
}

module.exports = {
  add: function(id, warehouse, turns, capacity) {
    drones[id] = {
      x: warehouse.x,
      y: warehouse.y,
      turns: turns,
      capacity: capacity
    };
  },
  get: function(id) {
    return drones[id];
  },
  move: function(id, warehouse) {
    var distance = euclidean(drones[id], warehouse);
    drone[id].x = warehouse.x;
    drone[id].y = warehouse.y;
    drone[id].turns -= Math.ceil(distance);
  },
  pick: function(id, productId) {
    drones[id].capacity -= products.getWeight(productId);
    drones[id].turns--;
  },
  deliver: function(id, productId) {
    drones[id].capacity += products.getWeight(productId);
    drones[id].turns--;
  }
};

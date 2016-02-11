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
      capacity: capacity,
      movements: []
    };
  },
  get: function(id) {
    return drones[id];
  },
  move: function(id, to) {
    var distance = euclidean(drones[id], to);
    drones[id].x = to.x;
    drones[id].y = to.y;
    drones[id].turns -= Math.ceil(distance);
  },
  pick: function(id, productId) {
    drones[id].capacity -= products.getWeight(productId);
    drones[id].turns--;
  },
  load: function(id, warehouse, productId, quantity) {
    this.move(id, warehouse);
    this.pick(id, productId);
    drones[i].movements.push(id + ' L ' + warehouse.id + ' ' + productId + ' ' + quantity);
  },
  unload: function(id, customer, productId) {

  },
  deliver: function(id, productId) {
    drones[id].capacity += products.getWeight(productId);
    drones[id].turns--;
  },
  canMove: function(id) {
    return drones[id].turns > 0;
  }
};

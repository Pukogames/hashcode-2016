var drones = [];
var products = require('./products');

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
      counter: 3,
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
    warehouse.products[productId]--;
    drones[id].movements.push(id + ' L ' + warehouse.id + ' ' + productId + ' ' + quantity);
  },
  unload: function(id, order, productId, quantity) {
    this.move(id, order);
    this.deliver(id, productId);
    drones[id].movements.push(id + ' D ' + order.id + ' ' + productId + ' ' + quantity);
  },
  canGo: function(id, to, toto) {
    var distance = euclidean(drones[id], to);
    var distance2 = euclidean(to, toto);
    return Math.ceil(distance) + 1 + Math.ceil(distance2) + 1  < drones[id].turns;
  },
  deliver: function(id, productId) {
    drones[id].capacity += products.getWeight(productId);
    drones[id].turns--;
  },
  canMove: function(id) {
    return drones[id].turns > 0;
  },
  export: function() {
    var movs = [];
    for (var i = 0; i < drones.length; i++) {
      movs = movs.concat(drones[i].movements);
    }

    return [movs.length].concat(movs);
  }
};

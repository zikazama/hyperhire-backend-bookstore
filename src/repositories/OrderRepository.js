// Import model
const Order = require('../entities/Order'); 

async function create(order) {

  return await Order.create(order);

}

async function findOne(params){
    return await Order.findOne(params);
}

module.exports = {
  create,
  findOne
}

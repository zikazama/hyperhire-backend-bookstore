const User = require('../entities/User');

async function createUser(username, fullname, email, password, point) {
  return await User.create({ username, fullname, email, password, point });
}

async function findUser(objectParams) {
  return await User.findOne(objectParams);
}

async function update(params) {
  return await User.update(params);
}

module.exports = { createUser, findUser, update };
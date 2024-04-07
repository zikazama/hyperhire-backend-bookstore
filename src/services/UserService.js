const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');

async function authenticateUser(username, password) {
  const user = await UserRepository.findUser({ where: { username } });
  if (!user) return null;

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return null;

  return user;
}

async function createUser(username, fullname, email, password) {
  const hashPassword = await bcrypt.hash(password, 10);
  const point = 100;
  return await UserRepository.createUser(username, fullname, email, hashPassword, point);
}

async function findUser(userId) {
  return UserRepository.findUser({
    where: {
      id: userId
    }
  });
}

module.exports = { createUser, authenticateUser, findUser };
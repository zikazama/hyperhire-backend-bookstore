// OrderRepository
const OrderRepository = require("../repositories/OrderRepository");
const UserRepository = require("../repositories/UserRepository");
const BookRepository = require("../repositories/BookRepository");

async function updateUserPoints(userId, point) {
  const user = await UserRepository.findUser({
    where: {
      id: userId,
    },
  });

  const newPoint = user.point + point * -1;

  return user.update({
    point: newPoint,
  });
}

async function cancelUserPoints(userId, bookId) {
  const book = await BookRepository.findOne(bookId);

  const user = await UserRepository.findUser({
    where: {
      id: userId,
    },
  });

  const newPoint = user.dataValues.point + book.dataValues.price;

  return user.update({
    point: newPoint,
  });
}

async function orderExists(bookId, userId) {
  const order = await OrderRepository.findOne({
    where: {
      bookId,
      userId,
      isCanceled: false,
    },
  });

  return order ? true : false;
}

async function cancelOrder(orderId, userId) {
  const order = await OrderRepository.findOne({
    where: {
      id: parseInt(orderId),
      isCanceled: false,
      userId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  await cancelUserPoints(userId, order.dataValues.bookId);

  return order.update({ isCanceled: true });
}

async function createOrder({ bookId, userId, point }) {
  await updateUserPoints(userId, point);

  const order = {
    bookId,
    userId,
    isCanceled: false,
  };

  return OrderRepository.create(order);
}

module.exports = {
  createOrder,
  orderExists,
  cancelOrder,
};

const { Sequelize } = require("sequelize");
const Book = require("../entities/Book");
const Order = require("../entities/Order");

async function findAllPaginate({page, limit, search}) {
  const offset = (page - 1) * limit;
  const books = await Book.findAndCountAll({
    offset,
    limit,
    where: {
      title: {
        [Sequelize.Op.like]: `%${search}%`,
      }
    }
  });
  return books;
}

async function findOne(id) {
  const book = await Book.findByPk(id);
  return book;
}

async function getBooksOrderedByUser(userId, page, limit, search) {

  const orders = await Order.findAll({
    where: {
      userId, 
      isCanceled: false
    }
  });

  const bookIds = orders.map(order => order.bookId);
  const offset = (page - 1) * limit;
  let books = await Book.findAndCountAll({
    offset,
    limit,
    where: {
      id: bookIds,
      title: {
        [Sequelize.Op.like]: `%${search}%`,
      }
    }
  });

  books.rows = books.rows.map(book => {
    return {
      ...book.dataValues,
      order: orders.find(order => order.bookId === book.dataValues.id)
    }
  })
  return books;
}

module.exports = { findAllPaginate, findOne, getBooksOrderedByUser };

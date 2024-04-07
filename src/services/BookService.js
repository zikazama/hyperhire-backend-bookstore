const BookRepository = require("../repositories/BookRepository");

async function getBooks(page = 1, limit = 10, search = '') {
  return await BookRepository.findAllPaginate({page, limit, search});
}

async function getBookById(id) {
  return await BookRepository.findOne(id);
}

async function getBookByUser(userId, page = 1, limit = 10, search = '') {

  const book = await BookRepository.getBooksOrderedByUser(
    userId, page, limit, search
  );

  return book;

}

module.exports = { getBooks, getBookById, getBookByUser };

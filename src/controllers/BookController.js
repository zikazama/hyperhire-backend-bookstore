const express = require("express");
const router = express.Router();
const BookService = require("../services/BookService");
const verifyToken = require("./../middlewares/auth");

router.get("/books", async (req, res) => {
  const { page, limit, search } = req.query;
  try {
    const books = await BookService.getBooks(page, limit, search);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await BookService.getBookById(id);
    if(!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/mybook", verifyToken, async (req, res) => {
  const { page, limit, search } = req.query;
  try {
    const book = await BookService.getBookByUser(req.userId, page, limit, search); 
    if(!book) {
      return res.status(404).json({message: "Book not found"});
    }
    res.status(200).json(book);

  } catch (error) {
    res.status(500).json({error: error.message}); 
  }

});

module.exports = router;

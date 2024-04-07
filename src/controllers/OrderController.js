const express = require("express");
const router = express.Router();
const OrderService = require("../services/OrderService");
const UserService = require("../services/UserService");
const BookService = require("../services/BookService");
const verifyToken = require("./../middlewares/auth");

router.post("/orders", verifyToken, async (req, res) => {
  const { bookId } = req.body;
  const book = await BookService.getBookById(bookId);
  const user = UserService.findUser(req.userId);

  if (book.price > user.point) {
    return res.status(400).json({ message: "Point not enough" });
  }

  try {
    const checkOrder = await OrderService.orderExists(
      bookId,
      req.userId,
    );

    if (checkOrder)
      return res.status(400).json({ message: "Book already ordered" });

    const order = await OrderService.createOrder({
      bookId,
      userId: req.userId,
      point: book.price,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.put('/orders/:orderId/cancel', verifyToken, async (req, res) => {

  try {

    const orderId = req.params.orderId;

    await OrderService.cancelOrder(orderId, req.userId);

    res.status(200).json({message: "Order canceled"});

  } catch (error) {

    res.status(400).json({error: error.message});

  }

})

module.exports = router;

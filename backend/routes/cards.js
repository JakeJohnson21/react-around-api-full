const router = require("express").Router();
const {
  validateCardBody,
  validateAuthentication,
} = require("../middlewares/validation");
const {
  getCards,
  getCardById,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require("../controllers/cards");
const { validate } = require("../models/card");

router.get("/cards", getCards);
router.get("/cards/:_id", validateAuthentication, getCardById);
router.post("/cards", validateCardBody, createCard);
router.delete("/cards/:id", validateAuthentication, deleteCard);
router.put("/cards/:cardId/likes", validateAuthentication, likeCard);
router.delete("/cards/:cardId/likes", validateAuthentication, unlikeCard);

module.exports = router;

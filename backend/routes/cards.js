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

router.post("/", validateCardBody, createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", unlikeCard);
router.get("/", validateAuthentication, getCards);
router.get("/:_id", validateAuthentication, getCardById);

module.exports = router;

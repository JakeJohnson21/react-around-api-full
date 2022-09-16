const router = require("express").Router();
const {
  validateCardBody,
  validateAuthentication,
  validateOwner,
  validateId,
  validateCardId,
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
router.delete("/:cardId", validateCardId, deleteCard);
router.put("/:cardId/likes", validateCardId, likeCard);
router.delete("/:cardId/likes", validateCardId, unlikeCard);
router.get("/", validateAuthentication, getCards);
router.get("/:_id", validateAuthentication, getCardById);

module.exports = router;

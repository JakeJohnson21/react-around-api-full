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

router.get("/", validateAuthentication, getCards);
router.get("/:_id", validateAuthentication, getCardById);
router.post("/", createCard);
router.delete("/:id", validateAuthentication, deleteCard);
router.put("/:cardId/likes", validateAuthentication, likeCard);
router.delete("/:cardId/likes", validateAuthentication, unlikeCard);

module.exports = router;

const Card = require("../models/card");
const {
  NotFoundError, // 404
  BadRequestError, // 400
  ForbiddenError, // 403
} = require("../errors/errors");

const getCards = (req, res, next) =>
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);

const getCardById = (req, res, next) =>
  Card.findById(req.params._id)
    .orFail(() => {
      const error = new Error("No card with that ID was found");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).send(card))
    .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(", ")}`
          )
        );
      }
      next(err);
    });
};

const updateLike = (req, res, next, method) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { [method]: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("No card found with that id"))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const likeCard = (req, res, next) => updateLike(req, res, next, "$addToSet");
const unlikeCard = (req, res, next) => updateLike(req, res, next, "$pull");

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new NotFoundError("No card found by that id"))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError("You cannot delete someone else's card"));
      }
      Card.deleteOne(card).then(() => res.send({ data: card }));
    })
    .catch(next);
};

module.exports = {
  getCards,
  getCardById,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard,
};

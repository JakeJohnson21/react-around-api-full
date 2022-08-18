import React, { useContext } from "react";
import trashSrc from "../images/Trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  onPreviewPopupClick,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardDeleteButtonClassName = `card__trash ${
    isOwn ? `card__trash_visible` : `card__trash_hidden`
  }`;
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? `card__like-button_active` : `card__like-button_hidden`
  }`;

  function handleClick() {
    onCardClick(card);
    onPreviewPopupClick();
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="card__item" key={card._id}>
      <img
        className="card__image"
        onClick={handleClick}
        src={card.link}
        alt=""
      />
      <img
        id="trash-svg"
        alt="trash icon"
        className={cardDeleteButtonClassName}
        src={trashSrc}
        onClick={handleDeleteClick}
      />
      <div className="card__text">
        <h2 className="card__place">{card.name}</h2>
        <div className="card__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="like"
            onClick={handleLikeClick}
          />
          <p className="card__like-text">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;

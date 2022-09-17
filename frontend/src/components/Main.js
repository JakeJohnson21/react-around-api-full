import React, { useContext } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onPreviewPopupClick,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__text">
          <div className="profile__image" onClick={onEditAvatarClick}>
            <img
              className="profile__pic"
              id="imageImg"
              alt=""
              src={currentUser.avatar}
            />
            <button
              className="profile__pic-button"
              type="button"
              aria-label="edit profile"
            />
          </div>
          <div className="profile__main">
            <div className="profile__title">
              <h1 className="profile__title-name">{currentUser.name}</h1>
              <button
                onClick={onEditProfileClick}
                className="profile__edit-button"
                type="button"
                aria-label="edit profile"
              />
            </div>
            <p className="profile__text-job">{currentUser.about}</p>
          </div>
        </div>

        <button
          onClick={onAddPlaceClick}
          className="profile__add"
          type="button"
          aria-label="add"
        />
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onPreviewPopupClick={onPreviewPopupClick}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;

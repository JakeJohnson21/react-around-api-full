import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlaceSubmit, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }
  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name,
      link,
    });
  }
  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="New Place"
      submitBtnText="Create"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        name="name"
        onChange={handleName}
        type="text"
        value={name}
        className="modal__input modal__input_image_title"
        placeholder="Title"
        required
        minLength="1"
        maxLength="30"
      />
      <span id="place-input-error" className="modal__input-error" />
      <input
        id="url-input"
        name="link"
        onChange={handleLink}
        value={link}
        type="url"
        className="modal__input modal__input_image_link"
        placeholder="Image link"
        required
      />
      <span id="url-input-error" className="modal__input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;

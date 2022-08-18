import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }
  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Edit profile"
      submitBtnText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label name="">
        <input
          id="name-input"
          name="name"
          onChange={handleName}
          value={name}
          type="text"
          className="modal__input modal__input_profile_name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="40"
        />
        <span id="name-input-error" className="modal__input-error" />
      </label>
      <label name="">
        <input
          id="title-input"
          name="title"
          onChange={handleDescription}
          value={description}
          type="text"
          className="modal__input modal__input_profile_title"
          placeholder="Description"
          required
          minLength="2"
          maxLength="200"
        />

        <span id="title-input-error" className="modal__input-error" />
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;

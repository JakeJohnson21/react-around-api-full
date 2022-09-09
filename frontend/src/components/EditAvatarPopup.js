import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState("");

  function handleAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar,
    });
  }

  useEffect(() => {
    setAvatar(currentUser.avatar || "");
  }, [currentUser]);

  return (
    <PopupWithForm
      name="pic"
      title="Edit profile pic"
      submitBtnText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label for="pic-input">
        <input
          onChange={handleAvatar}
          value={avatar}
          id="pic-input"
          name="link"
          type="url"
          className="modal__input modal__input_edit_pic"
          placeholder="link"
          required
        />
        <span id="url-input-error" className="modal__input-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

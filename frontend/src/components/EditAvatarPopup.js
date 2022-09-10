import React, { useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = useRef({});

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

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
          ref={avatarRef}
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

function PopupWithForm({
  name,
  isOpen,
  title,
  children,
  submitBtnText,
  onSubmit,
  onClose,
}) {
  return (
    <div
      className={`modal js-${name}-modal ${isOpen ? "modal__is-opened" : ""} `}
    >
      {
        <div className="modal__container">
          <form className="modal__box" name={name}>
            <h2 className="modal__profile">{title}</h2>
            {children}

            <button
              type="submit"
              className="modal__button"
              aria-label={submitBtnText}
              onClick={onSubmit}
            >
              {submitBtnText}
            </button>
          </form>
          <button
            className="modal__close-button"
            type="button"
            aria-label="close"
            onClick={onClose}
          />
        </div>
      }
    </div>
  );
}

export default PopupWithForm;

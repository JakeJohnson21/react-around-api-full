import React from "react";
import successIcon from "../images/UnionCheck.png";
import errorIcon from "../images/UnionX.png";

function InfoToolTip({ isOpen, onClose, status }) {
  return (
    <div className={`modal ${isOpen && "modal__is-opened"}`}>
      <div className="modal__container">
        <div className="modal__box" noValidate>
          <button
            className="modal__close-button"
            type="button"
            aria-label="close"
            onClick={onClose}
          ></button>
          {status === "success" ? (
            <div>
              <img className="modal__icon" src={successIcon} alt="" />
              <p className="modal__status-message">
                Success! You have now been registered.
              </p>
            </div>
          ) : (
            <div>
              <img className="modal__icon" src={errorIcon} alt="" />
              <p className="modal__status-message">
                Oops, something went wrong! Please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default InfoToolTip;

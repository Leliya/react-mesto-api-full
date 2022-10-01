import React from "react";
import imageRegOk from "../images/infoTooltip-ok.svg";
import imageRegError from "../images/infoTooltip-error.svg";

function InfoTooltip({ isOpen, onClose, message, isRegOk }) {
  function cancelClose(e) {
    e.stopPropagation();
  }
  let image = isRegOk ? imageRegOk : imageRegError;

  return (
    <div
      className={`popup popup_type_info ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container popup__container_type_info"
        onClick={cancelClose}
      >
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img alt={`${isRegOk ? "Успешно" : "Ошибка"}`} src={image} />
        <h2 className="popup__title popup__title_type_info">
          {isRegOk ? "Вы успешно зарегистрированы!" : message}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
